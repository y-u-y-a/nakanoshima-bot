import express from 'express'

import { PORT } from './config/index.js'
import { lineMiddleware } from './line/index.js'
import messageAPIController from './controllers/messageAPIController.js'

const app = express()

// LINE Message API
app.post('/webhook', lineMiddleware(), async (...args) => {
  await messageAPIController.post(...args)
})

app.listen(PORT)
console.log(`Start server ${PORT}...`)
