import { Buffer } from 'buffer';
import * as crypto from 'crypto';

export const useDecrypt = (encryptedItem: string): string => {
    if (process.env.PRIVATE_ENCRYPTION_KEY) {
        const decodedKey = Buffer.from(process.env.PRIVATE_ENCRYPTION_KEY, 'base64').toString(
            'ascii'
        );
        const rsaPrivateKey = {
            key: decodedKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        };

        const decryptedMessage = crypto.privateDecrypt(
            rsaPrivateKey,
            Buffer.from(encryptedItem, 'base64'),
        );

        return decryptedMessage.toString('ascii');
    } else {
       throw new Error('NO PRIVATE KEY FOR ENCRYPTION')
    }
};