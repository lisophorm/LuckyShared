import dotenv from 'dotenv'

dotenv.config()

// we could branch between 'production' and 'development'

export const config: any = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    BASE_URL: process.env.BASE_UR || 'http://localhost:3000/',
    RECORDS_PAGE: process.env.RECORDS_PAGE || 10,
}
