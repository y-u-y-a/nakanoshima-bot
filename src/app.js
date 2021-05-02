import express from 'express'

import { PORT, line, lineChannel } from './config.js'
import messageController from './messageController.js'

const app = express()

// Message API webhook
app.post('/webhook', line.middleware(lineChannel), async (...args) => {
  await messageController.main(...args)
})

app.listen(PORT)
console.log(`Start server ${PORT}...`)
