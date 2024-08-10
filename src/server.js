import express from 'express'
import errorMiddleware from "./middlewares/error.middleware.js"
import routes from "./routes/routes.js"

const app = express()
const port = 3001

app.use(express.json())
app.use(errorMiddleware)
app.use(routes)

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`)
})