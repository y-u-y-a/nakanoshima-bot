import { lineClient, DUST_REGEXP, DUST_SCHEDULE, WEEKDAY_LIST } from './config.js'

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
    let response = { type: 'text', text: '申し訳ございません。入力内容に誤りがあります。' }
    // text
    if (event.message.type === 'text') {
      const text = event.message.text
      if (text.match(DUST_REGEXP)) response.text = await this.getDuxtInfo()
    }
    return response
  }

  async getDuxtInfo() {
    let textList = await Promise.all(
      // 7日分取得
      [...Array(7)].map(async (_, n) => {
        const { date, month, day } = await this.getDate(n)
        let { nth, wd } = await this.getWeekday(date)
        // 第1,3火曜日の場合
        wd = nth.match(/1|3/) && wd === '火' ? nth + wd : wd
        const dustItem = await this.getDustItem(wd)
        return `${month}/${day}(${wd})：${dustItem}`
      })
    )
    return textList.join('\n')
  }

  async getDustItem(targetWeekday) {
    const obj = DUST_SCHEDULE.find((item) => {
      return targetWeekday === item.wd
    })
    return obj.dustItem
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
  async getWeekday(date) {
    // 曜日
    const wd = WEEKDAY_LIST[date.getDay()]
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
