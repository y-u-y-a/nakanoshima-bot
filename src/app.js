import express from 'express'

import { PORT } from './config/index.js'
import { lineMiddleware, lineClient } from './config/line.js'
import responseController from './controllers/responseController.js'

const app = express()

app.use(lineMiddleware())

// Message API webhook
app.post('/webhook', async (req, res) => {
  try {
    console.log(req.body.events)
    const event = req.body.events[0]
    // eventが存在する場合
    if (event) {
      const response = await responseController.get(event)
      lineClient.replyMessage(event.replyToken, response)
    }
    // verify想定
    res.sendStatus(200)
  } catch (err) {
    console.log('catch error >>>>>\n', err)
    res.sendStatus(500)
  }
})

app.listen(PORT)
console.log(`Start server ${PORT}...`)
