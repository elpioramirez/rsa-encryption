import {FC, Fragment, useCallback, useState} from 'react';
import axios from 'axios';
import { Form, Input, Checkbox, Button, Layout } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {useEncrypt} from "./utils/useEncrypt";

type LoginArgs = {
  email: string;
  password: string;
  remember?: boolean;
};
export const App: FC = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [decryptedPassword, setDecryptedPassword] = useState<string | null>(null);

  const { encrypt } = useEncrypt<string>();
  const [loginForm] = Form.useForm();
  const handleSubmit = useCallback(
      async (formValues: LoginArgs) => {

        const encryptedPassword = encrypt(formValues.password);
        await axios.post(`http://localhost:8005/login`, {
            password: encryptedPassword,
          }).then(res => {
              if(res.data){
                  setDecryptedPassword(res.data.decryptedPassword);
              }
        })

      },
      [encrypt]
  );

  return (
      <Layout style={{ minHeight: '100vh' }}>
          <Form
              name="login-form"
              form={loginForm}
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              autoComplete="off"
          >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Email is Required' }]}
            >
              <Input prefix={<UserOutlined />} placeholder={'Email'} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={'Password'}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item noStyle>
                <Checkbox
                    checked={rememberMe}
                    onChange={(e) => {
                      setRememberMe(e.target.checked);
                    }}
                >
                  {'Remember Me'}
                </Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ display: 'inline-block', width: '100%', marginBottom: '0.75rem' }}>
              <Button
                  style={{ width: '100%', marginBottom: 0 }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
              >
                {'Login'}
              </Button>
            </Form.Item>
          </Form>
          <Fragment>
              {decryptedPassword && `The decrypted password is : ${decryptedPassword}`}
          </Fragment>
      </Layout>
  );
};
