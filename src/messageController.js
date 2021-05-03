import { lineClient, DUST_SCHEDULE, WEEKDAY_LIST, PERIOD, DUST_REGEXP, FIRST_THIRD_REGEXP } from './config.js'

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
      const getText = event.message.text
      if (DUST_REGEXP.test(getText)) response.text = await this.getDustDate(PERIOD)
    }
    return response
  }

  async getDustDate(period) {
    let textList = await Promise.all(
      // 7日分取得
      [...Array(period)].map(async (_, n) => {
        let { month, day, wd, wdNth } = await this.getDate(n)
        // 第1,3火曜日の場合
        if (FIRST_THIRD_REGEXP.test(wdNth) && wd === '火') wd = wdNth + wd
        //
        const dustItem = await this.getDustItem(wd)
        return `${month}/${day}（${wd}）${dustItem}`
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
    const wdIndex = date.getDay() // 曜日のindex
    const wd = WEEKDAY_LIST[wdIndex] // 曜日
    const wdNth = String(Math.floor((date.getDate() + 6) / 7)) // 曜日の第N番目
    return { date, month, day, wd, wdNth }
  }

  // 第N週目
  async getNthWeek(date) {
    const nth = String(Math.floor((date.getDate() - date.getDay() + 12) / 7))
    return nth
  }
}
export default new MessageController()
