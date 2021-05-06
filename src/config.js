import line from '@line/bot-sdk'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const lineChannel = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
}

const lineClient = new line.Client(lineChannel)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const WEEKDAY_LIST = ['日', '月', '火', '水', '木', '金', '土']

const PERIOD = 7

const DUST_SCHEDULE = [
  { wd: '日', dustItem: 'なし' },
  { wd: '月', dustItem: 'ミックスペーパー' },
  { wd: '火', dustItem: 'プラスチック' },
  { wd: '1火', dustItem: '小物金属・粗大ごみ' },
  { wd: '3火', dustItem: '小物金属・粗大ごみ' },
  { wd: '水', dustItem: '普通ごみ' },
  { wd: '木', dustItem: 'なし' },
  { wd: '金', dustItem: 'ビン/かん・PET・電池' },
  { wd: '土', dustItem: '普通ごみ' },
]

const DUST_REGEXP = new RegExp(/ゴミ|ごみ/)

const FIRST_THIRD_REGEXP = new RegExp(/1|3/)

export { PORT, line, lineChannel, lineClient }
export { WEEKDAY_LIST, PERIOD, DUST_SCHEDULE }
export { DUST_REGEXP, FIRST_THIRD_REGEXP }
