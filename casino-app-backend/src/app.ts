import express, { Application, Request, Response } from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import gameRoutes from './routes/game-routes'
import fs from 'fs'
import { config } from './config/config'

const app: Application = express()

// Middleware
app.use(bodyParser.json())

// Serve static files from the React frontend app
const buildPath = path.join(__dirname, '../../casino-app-frontend/build')
const staticPath = path.join(__dirname, '../../casino-app-frontend/build')

console.log('config here:', config)

console.log('cacca2')

// Dynamically inject all environment variables into index.html
app.get('/', (req: Request, res: Response) => {
    const indexFilePath = path.join(
        __dirname,
        '../../casino-app-frontend/build/index.html'
    )
    console.log('here')
    // Read the HTML file

    fs.readFile(indexFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html', err)
            return res.status(500).send('An error occurred')
        }

        // Dynamically generate the envVars script from process.env
        const envVars = Object.keys(config).reduce((script, key) => {
            return `${script}window.env.${key} = "${config[key]}";\n`
        }, '<script>window.env = {};\n')

        console.log('env vars')
        console.log(envVars)
        console.log('data')
        console.log(data)

        // Close the script tag
        const finalEnvVarsScript = `${envVars}</script>`

        // Inject the script into the HTML, just before the closing head tag
        const updatedHtml = data.replace(
            '<head>',
            `<head>${finalEnvVarsScript}`
        )

        res.send(updatedHtml)
    })
})

app.use(express.static(staticPath))

// API Routes
app.use('/api/games', gameRoutes)

export default app
