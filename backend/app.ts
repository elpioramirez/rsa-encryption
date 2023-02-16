import express, { Express, Request, Response } from 'express';
import jsonParser from 'body-parser';
import cors from 'cors';

import {useDecrypt} from "./useDecrypt";
const app: Express = express();


const corsOptions = {
    exposedHeaders: 'x-auth-token,x-company-id',
};
if (process.env.NODE_ENV !== 'production') {
    app.set('trust proxy', true);
}

app.use(cors(corsOptions));
app.use(jsonParser.json({ limit: '5mb' }));


app.post('/login', (req: Request, res: Response) => {
    const { password} = req.body;
    const decryptedPassword = useDecrypt(password);
    res.json({decryptedPassword});
});


app.all('*', async (req: Request, res:Response) => {
    console.log(req);
    throw new Error('Not Found');
});


export { app };