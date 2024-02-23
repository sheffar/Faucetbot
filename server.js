import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})