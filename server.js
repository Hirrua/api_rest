import express from "express"
import routes from "./src/routes/routes.js"
import errorMiddleware from './src/middlewares/error.middleware.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(errorMiddleware)
app.use(routes)

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`)
})