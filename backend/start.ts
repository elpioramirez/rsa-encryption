import dotenv from 'dotenv';
import { app } from './app';


dotenv.config();

(async (): Promise<void> => {
    if (!process.env.PRIVATE_ENCRYPTION_KEY) {
        throw new Error('No PRIVATE_ENCRYPTION_KEY has been defined');
    }
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})();
