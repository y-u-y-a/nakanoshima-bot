import { lineClient, DUST_SCHEDULE, WEEKDAY_LIST, PERIOD, DUST_REGEXP, FIRST_THIRD_REGEXP } from './config.js'

class MessageController {
  //
  async main(req, res) {
    const event = req.body.events[0]
    console.log(event)
    // eventが存在する場合
    if (event) {
      const response = await this.getResponse(event)
      lineClient.replyMessage(event.replyToken, response)
    }
    // verify想定
    res.status(200).json({})
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
    // target day info
    const month = date.getMonth() + 1 // 月
    const day = date.getDate() // 日
    const wdIndex = date.getDay()
    const wd = WEEKDAY_LIST[wdIndex] // 曜日
    const wdNth = String(Math.floor((day + 6) / 7)) // 曜日の第N番目
    const weekNth = String(Math.floor((day - wdIndex + 12) / 7)) // 第N週目
    return { date, month, day, wd, wdNth, weekNth }
  }
}
export default new MessageController()
