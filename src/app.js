import express from 'express'

import { PORT, lineMiddleware, lineClient } from './config.js'
import responseController from './responseController.js'

const app = express()

// Message API webhook
app.post('/webhook', lineMiddleware(), async (req, res) => {
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
