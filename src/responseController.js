import { garbageConf } from './config.js'
import utils from './utils.js'

class responseController {
  async get(event) {
    let response = { type: 'text', text: '申し訳ございません。入力内容に誤りがあります。' }

    // Switch branch by request type.
    if (event.message.type === 'text') {
      switch (true) {
        /* ごみ|ゴミ|収集 */
        case garbageConf.requestRegExp.test(event.message.text):
          response.text = await this.getGarbageSchedule()
          break
        /* 駅 */
        case /レストラン|飲食|食事/.test(event.message.text):
          response = { type: 'template', altText: 'このデバイスでは使用できません。' }
          response.template = {
            type: 'buttons',
            text: '飲食店を探すから位置情報を送ってね！',
            actions: [{ type: 'location', label: '位置情報' }],
          }
          break
        default:
          break
      }
      // location type.
    } else if (event.message.type === 'location') {
      response.text = '位置情報をありがとう'
      // Sticker is stamp.
    } else if (event.message.type === 'sticker') {
      const [packageId, stickerId] = [11538, 51626496] // sticker info
      response = { type: 'sticker', packageId, stickerId }
    }
    return response
  }

  /* /ごみ|ゴミ|収集/ */
  async getGarbageSchedule() {
    const { responsePeriod, tuesdayRegExp, schedule } = garbageConf
    let textList = await Promise.all(
      // 7日分取得
      [...Array(responsePeriod)].map(async (_, n) => {
        let { month, day, wd, wdNth } = await utils.getDate(n)
        // 第1,3火曜日の場合
        if (tuesdayRegExp.test(wdNth) && wd === '火') wd = wdNth + wd
        // 分別項目名取得
        const garbage = schedule.find((item) => item.wd === wd)
        return `${month}/${day}（${wd}）${garbage.name}`
      })
    )
    return textList.join('\n')
  }
}
export default new responseController()
