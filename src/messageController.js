import { lineClient } from './config.js'

class MessageController {
  // constructor(lineClient) {
  //   this.client = lineClient
  // }
  async main(req, res) {
    const event = req.body.events[0]
    console.log(event)
    if (!event) res.status(200).json({})
    if (event.message.type === 'text') {
      const response = { type: 'text', text: event.message.text }
      lineClient.replyMessage(event.replyToken, response)
    }
  }
}
export default new MessageController()
