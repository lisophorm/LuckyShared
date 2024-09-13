import express, {Application, Request, Response} from 'express';
import exampleRoute from './routes/exampleRoute';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/example', exampleRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Node.js with TypeScript!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
