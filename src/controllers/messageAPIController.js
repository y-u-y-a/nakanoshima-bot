import { regExp } from '../config/index.js'
import { lineClient, defaultResponse, baseTemplate } from '../line/index.js'
import garbagesController from './garbagesController.js'
import eventsController from './eventsController.js'

class MessageAPIController {
  async post(req, res) {
    let response = defaultResponse
    try {
      console.log(req.body.events)
      const events = req.body.events
      // eventが存在する場合
      if (events.length > 0) {
        await Promise.all(
          events.map(async (event) => {
            const eventType = event.type
            // Messageイベント
            if (eventType === 'message') {
              const messageType = event.message.type
              if (messageType === 'text') response = await this.messageTextHandler(event.message.text)
              else if (messageType === 'location') response = await this.messageLocationHandler()
              // Postbackイベント
            } else if (eventType === 'postback') {
              response = await this.postbackDataHandler(event.postback.data)
            }
            lineClient.replyMessage(event.replyToken, response)
          })
        )
      }
      // verify想定
      res.sendStatus(200)
    } catch (err) {
      console.log('catch error >>>>>\n', err)
      res.sendStatus(500)
    }
  }

  // Text Messageオブジェクト --------------------------
  async messageTextHandler(messageText) {
    switch (true) {
      case /かほっぺ|香歩|カホ/.test(messageText): {
        return { type: 'text', text: 'こんにちは、かほっぺ！\n10月24日だよ！\n部屋番号は305だよ！' }
      }
      case /なな|菜那|ナナ|7|７|七/.test(messageText): {
        return { type: 'text', text: 'こんにちは、ななちゃん！\n09月28日だよ！\n部屋番号は308だよ！' }
      }
      case /ゆうや|祐也|ユウヤ/.test(messageText): {
        return { type: 'text', text: 'ゆうや！\n09月15日だよ！\n部屋番号は212だよ！' }
      }
      case regExp.test.test(messageText): {
        return { type: 'text', text: 'Coming soon ...' }
      }
      // ゴミ収集日
      case regExp.garbagesIndex.test(messageText): {
        return { type: 'text', text: await garbagesController.index() }
      }
      // イベント
      case regExp.eventsIndex.test(messageText): {
        const template = {
          type: 'buttons',
          text: 'アクションを選んでね！',
          actions: [
            { type: 'postback', label: 'イベント一覧', data: 'eventsIndex', displayText: 'イベント一覧' },
            { type: 'postback', label: 'イベント登録', data: 'eventsCreate', displayText: 'イベント登録' },
          ],
        }
        return { ...baseTemplate, template }
      }
      default:
        return defaultResponse
    }
  }

  // Location Messageオブジェクト ----------------------
  async messageLocationHandler() {
    return { type: 'text', text: '申し訳ございません。入力内容に誤りがあります。' }
  }

  // PostbackEventオブジェクト -------------------------
  async postbackDataHandler(postbackData) {
    // switch文の省略形
    const switcher = {
      eventsIndex: regExp.eventsIndex,
      eventsCreate: regExp.eventsCreate,
    }
    return switcher[postbackData] ? switcher[postbackData] : defaultResponse
    // switch (true) {
    //   // イベント
    //   case regExp.eventsIndex.test(postbackData): {
    //     return { type: 'text', text: await eventsController.index() }
    //   }
    //   case regExp.eventsCreate.test(postbackData): {
    //     return { type: 'text', text: await eventsController.create() }
    //   }
    //   default:
    //     defaultResponse
    // }
  }
}
export default new MessageAPIController()
