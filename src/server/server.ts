import express from 'express'
import cardsRoutes from './routes/index'
import crypto from 'crypto'

const app = express()
app.use(express.json())

app.use('/api/', cardsRoutes)

const port = 3003
app.listen(port, () => {
  console.info(`Server is running on port ${port}`)
})

app.get('/api/password-generator/:password', async (req, res) => {
  const password = req.params.password as string
  const salt = crypto.randomBytes(16).toString('hex')
  crypto.scrypt(password, salt, 64, (err, derivedKey) => {
    if (err) throw err
    const passwordHash = derivedKey.toString('hex')
    console.log(`Password hash: ${passwordHash}, salt: ${salt}`)
    res.status(200).send({ passwordHash, salt })
  })
})
