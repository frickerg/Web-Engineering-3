import express from 'express'
import routes from './routes/routes'

const app = express()
app.use(express.json())

app.use('/api/', routes)

const port = 3003
app.listen(port, () => {
  console.info(`Server is running on port ${port}`)
})
