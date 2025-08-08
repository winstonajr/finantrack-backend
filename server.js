import express from 'express'
import mainRouter from './src/api/routes/index.js'

const app = express()
const PORT = 3001

app.use(express.json())

app.use('/api', mainRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})