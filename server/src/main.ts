import express, {Request, Response} from 'express';
import cors from 'cors';

import router from './routes/topic';

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: "*"
    }
))

const PORT = process.env.PORT || 8000;


app.get('/', (req: Request, res: Response): Response => {
    return res.status(200).json({message: 'Hello World!'});
});

app.use(router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})