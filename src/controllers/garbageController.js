import { garbageConf } from '../config/index.js'
import utils from '../utils/index.js'

class GarbageController {
  constructor() {
    this.responsePeriod = garbageConf.responsePeriod
    this.tuesdayRegExp = garbageConf.tuesdayRegExp
    this.schedule = garbageConf.schedule
  }
  /* 収集日スケジュール取得 */
  async getSchedule() {
    // 配列の並列処理(Arrayを引数に渡す必要があるのでmap関数を使用)
    let textList = await Promise.all(
      // 7日分取得
      [...Array(this.responsePeriod)].map(async (_, n) => {
        let { month, day, wd, wdNth } = await utils.getDate(n)
        // 第1,3火曜日の場合
        if (this.tuesdayRegExp.test(wdNth) && wd === '火') wd = wdNth + wd
        // 分別項目名取得
        const garbage = this.schedule.find((item) => item.wd === wd)
        return `${month}/${day}（${wd}）${garbage.name}`
      })
    )
    return textList.join('\n')
  }
}
export default new GarbageController()
