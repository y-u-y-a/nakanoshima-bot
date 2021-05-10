import { textRegExp, garbageConf } from '../config/index.js'
import { defaultResponse, locationButtonTemplate, restaurantCarouselTemplate } from '../config/line.js'
import utils from '../utils.js'

class responseController {
  async get(event) {
    let response = defaultResponse
    if (event.message.type === 'text') {
      // 取得したテキストで条件分岐
      switch (true) {
        // ゴミ収集日
        case textRegExp.garbage.test(event.message.text): {
          response = { type: 'text', text: await this.getGarbageSchedule() }
          break
        }
        // レストラン
        case textRegExp.restaurant.test(event.message.text): {
          response = locationButtonTemplate
          break
        }
        default:
          break
      }
    } else if (event.message.type === 'location') {
      response = restaurantCarouselTemplate
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
