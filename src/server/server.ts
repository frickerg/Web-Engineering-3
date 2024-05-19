import express from 'express'
import cardsRoutes from './routes/cards'

const app = express()
app.use(express.json())

app.use('/api/cards', cardsRoutes)

const port = 3003
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
