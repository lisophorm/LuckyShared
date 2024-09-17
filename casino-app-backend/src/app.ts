import express, { Application, Request, Response } from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import gameRoutes from './routes/game-routes'
import { config } from './config/config'
import { renderHTML } from './controllers/render-html'

const app: Application = express()

// Middleware
app.use(bodyParser.json())

// Serve static files from the React frontend app
const buildPath = path.join(__dirname, '../../casino-app-frontend/build')
const staticPath = path.join(__dirname, '../../casino-app-frontend/build')

// Dynamically inject all environment variables into index.html
app.get('/', (req: Request, res: Response) => {
    const updatedHtml = renderHTML()
    res.send(updatedHtml)
})
app.get('/game/*', (req: Request, res: Response) => {
    const updatedHtml = renderHTML()
    res.send(updatedHtml)
})
app.get('/', (req: Request, res: Response) => {
    const updatedHtml = renderHTML()
    res.send(updatedHtml)
})

app.use(express.static(staticPath))

// API Routes
app.use('/api/games', gameRoutes)

export default app
