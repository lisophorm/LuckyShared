import express, { Application } from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import gameRoutes from './routes/game-routes'

import staticRoutes from './routes/static-routes'

const app: Application = express()

// Middleware
app.use(bodyParser.json())

// Serve static files from the React frontend app
const staticPath = path.join(__dirname, '../../casino-app-frontend/build')

app.use('/', staticRoutes)

app.use(express.static(staticPath))

// API Routes
app.use('/api/games', gameRoutes)

export default app
