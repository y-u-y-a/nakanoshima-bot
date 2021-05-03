import { lineClient } from './config.js'

const DUST_REGEXP = /ゴミ|ごみ|/
const schedule = [
  { wd: '日', dustItem: '' },
  { wd: '月', dustItem: 'ミックスペーパー' },
  { wd: '火', dustItem: 'プラスチック' },
  { wd: '水', dustItem: '普通ごみ' },
  { wd: '木', dustItem: '' },
  { wd: '金', dustItem: 'ビン/かん・PET・電池' },
  { wd: '土', dustItem: '普通ごみ' },
]
const weekdays = ['日', '月', '火', '水', '木', '金', '土']

class MessageController {
  //
  async main(req, res) {
    const event = req.body.events[0]
    console.log(event)
    // verify想定
    if (!event) res.status(200).json({})
    // eventが存在する場合
    const response = await this.getResponse(event)
    lineClient.replyMessage(event.replyToken, response)
  }

  async getResponse(event) {
    let response
    // text
    if (event.message.type === 'text') {
      const getText = event.message.text
      const text = getText.match(DUST_REGEXP) ? await this.getDuxtInfo() : '申し訳ございません。'
      response = { type: 'text', text }
    }
    return response
  }

  // ゴミの収集日
  async getDuxtInfo() {
    let textList = await Promise.all(
      [...Array(7)].map(async (_, n) => {
        const { date, month, day, wdIndex } = await this.getDate(n)
        const { nth, wd } = await this.getWeekDay(date)
        console.log(nth)
        // 第1,3火曜日の場合
        if (nth.match(/1|3/) && wd === '火') return `${month}/${day}(${nth}${schedule[wdIndex].wd})：小物金属・粗大ごみ`
        return `${month}/${day}(${schedule[wdIndex].wd})：${schedule[wdIndex].dustItem}`
      })
    )
    return textList.join('\n')
  }

  async getDate(addDay) {
    // today info
    const date = new Date()
    const today = date.getDate()
    date.setDate(today + addDay)
    // wanted info
    const month = date.getMonth() + 1
    const day = date.getDate()
    const wdIndex = date.getDay()
    return { date, month, day, wdIndex }
  }

  // 曜日, 第N番目
  async getWeekDay(date) {
    // 曜日
    const wd = weekdays[date.getDay()]
    // 第N番目
    const nth = String(Math.floor((date.getDate() + 6) / 7))
    return { nth, wd }
  }

  // 第N週目
  async getNthWeek(date) {
    const nth = String(Math.floor((date.getDate() - date.getDay() + 12) / 7))
    return nth
  }
}
export default new MessageController()
