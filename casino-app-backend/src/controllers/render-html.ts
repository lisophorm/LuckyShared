import path from 'path'
import fs from 'fs'
import { config } from '../config/config'

import dotenv from 'dotenv'

dotenv.config()

export const renderHTML = () => {
    const indexFilePath = path.join(
        __dirname,
        '../../../casino-app-frontend/build/index.html'
    )
    console.log('here')
    // Read the HTML file

    const data = fs.readFileSync(indexFilePath, { encoding: 'utf8', flag: 'r' })

    // Dynamically generate the envVars script from process.env
    const envVars = Object.keys(config).reduce((script, key) => {
        return `${script}process.env.${key} = "${config[key]}";\n`
    }, '')

    console.log('env vars')
    console.log(envVars)
    console.log('config')
    console.log(config)

    // Close the script tag
    const finalEnvVarsScript = `<script>${envVars}</script>`

    // Inject the script into the HTML, just before the closing head tag
    const updatedHtml = data.replace('<head>', `<head>${finalEnvVarsScript}`)
    return updatedHtml
}
