import express, { Application, Request, Response } from 'express';
import path from 'path';
import exampleRoute from './routes/exampleRoute';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// API routes
app.use('/api/example', exampleRoute);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../casino-app-frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
