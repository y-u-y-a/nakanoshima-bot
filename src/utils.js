import { WEEKDAY_LIST } from './config/index.js'

export default {
  getDate(addDay) {
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
  },
}
