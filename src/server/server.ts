import express from 'express'
import cardsRoutes from './routes/index'

const app = express()
app.use(express.json())

app.use('/api/', cardsRoutes)

const port = 3003
app.listen(port, () => {
  console.info(`Server is running on port ${port}`)
})
