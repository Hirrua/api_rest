const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack)
    if (err.status) {
        res.status(err.status).json({ error: err.message })
    } else {
        res.status(500).json({ error: 'OPS, algo deu errado!' })
    }
}

export default errorMiddleware