import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import errorMiddleware from "./src/middlewares/error.middleware.js"
import routes from "./src/routes/routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname =  path.dirname(__filename)

const app = express()
const port = 3001

app.use(express.json())
app.use(express.static(path.resolve(__dirname, "uploads")))
app.use(errorMiddleware)
app.use(routes)

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`)
})