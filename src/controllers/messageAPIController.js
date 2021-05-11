import { textRegExp } from '../config/index.js'
import { lineClient, defaultResponse, baseTemplate } from '../line/index.js'
import garbageController from './garbageController.js'

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
            // Messageイベント
            if (event.type === 'message') {
              // Textメッセージ
              if (event.message.type === 'text') {
                response = await this.textMessageHandler(event.message.text)
                // Locationメッセージ
              } else if (event.message.type === 'location') {
                response = await this.locationMessageHandler()
              }
              // Postbackイベント
            } else if (event.type === 'postback') {
              // アクションごとに条件分岐
              if (event.postback.data === 'action=freeTime&flg=true') {
                response = { type: 'text', text: '今のところ３人集まったよ！' }
              } else if (event.postback.data === 'action=freeTime&flg=false') {
                response = { type: 'text', text: '今のところ１人集まったよ！' }
              }
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

  // PostbackEventオブジェクト -------------------------
  async postbackEventHandler() {
    return
  }

  // Text Messageオブジェクト --------------------------
  async textMessageHandler(getText) {
    switch (true) {
      // ゴミ収集日
      case textRegExp.garbage.test(getText): {
        const text = await garbageController.getSchedule()
        return { type: 'text', text }
      }
      // 暇かどうか
      case textRegExp.freeTime.test(getText): {
        baseTemplate.template = {
          type: 'buttons',
          text: '今日は？？',
          actions: [
            { type: 'postback', label: 'ひまー', data: 'action=freeTime&flg=true', displayText: 'ひまー' },
            { type: 'postback', label: 'ひまじゃない', data: 'action=freeTime&flg=false', displayText: 'ひまじゃない' },
          ],
        }
        return baseTemplate
      }
      default:
        return defaultResponse
    }
  }

  // Location Messageオブジェクト ----------------------
  async locationMessageHandler() {
    return { type: 'text', text: '申し訳ございません。入力内容に誤りがあります。' }
  }
}
export default new MessageAPIController()
