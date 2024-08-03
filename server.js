import express from "express"
import routes from "./src/routes/routes.js"

const app = express()
const port = 3001

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`)
})