import express from "express"
import dotenv from "dotenv"
import errorMiddleware from "./middlewares/error.middleware.js"
import routes from "./routes/routes.js"
import path from "path"

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "uploads")))

app.use(errorMiddleware)
app.use(routes)

app.listen(port)