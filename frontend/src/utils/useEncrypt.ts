import { Buffer } from 'buffer';

import { useCallback } from 'react';

export const useEncrypt = <T>() => {
    const encrypt = useCallback((data: T): string => {
        if (process.env.REACT_APP_PUBLIC_ENCRYPTION_KEY) {
            // @ts-ignore { /* This has being imported in public folder as script of minify js file */}
            const encryptRsa = new window.JSEncrypt();

            const decodedPublicKey = new Buffer(
                process.env.REACT_APP_PUBLIC_ENCRYPTION_KEY,
                'base64'
            ).toString('ascii');
            encryptRsa.setPublicKey(decodedPublicKey);
            return encryptRsa.encrypt(JSON.stringify(data));
        } else {
            throw new Error('No PUBLIC ENCRYPTION KEY');
        }
    }, []);

    return { encrypt };
};