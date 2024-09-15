import dotenv from 'dotenv'

dotenv.config()

export const config: any = {
    PORT: process.env.PORT || 3000,
}
