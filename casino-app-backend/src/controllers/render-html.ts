import path from 'path'
import fs from 'fs'
import { config } from '../config/config'

import dotenv from 'dotenv'
import { Request, Response } from 'express'

dotenv.config()

export const renderHTML = (req: Request, res: Response) => {
    const indexFilePath = path.join(
        __dirname,
        '../../../casino-app-frontend/build/index.html'
    )

    const data = fs.readFileSync(indexFilePath, { encoding: 'utf8', flag: 'r' })

    // Dynamically generate the envVars script from process.env
    const envVars = Object.keys(config).reduce((script, key) => {
        return `${script}settings.${key} = "${config[key]}";\n`
    }, '')

    const finalEnvVarsScript = `<script>settings={}\n${envVars}</script>`

    // Inject the script into the HTML
    const updatedHtml = data.replace('<head>', `<head>${finalEnvVarsScript}`)
    res.send(updatedHtml)
}
