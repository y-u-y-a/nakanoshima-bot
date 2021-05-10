import line from '@line/bot-sdk'
import dotenv from 'dotenv'

dotenv.config()
export const PORT = process.env.PORT

export const WEEKDAY_LIST = ['日', '月', '火', '水', '木', '金', '土']

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const lineChannel = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
}

export const lineClient = new line.Client(lineChannel)

export const lineMiddleware = () => line.middleware(lineChannel)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const garbageConf = {
  responsePeriod: 7,
  requestRegExp: new RegExp(/ゴミ|ごみ|収集/),
  tuesdayRegExp: new RegExp(/1|3/),
  schedule: [
    { wd: '日', name: 'なし' },
    { wd: '月', name: 'ミックスペーパー' },
    { wd: '火', name: 'プラスチック' },
    { wd: '1火', name: '小物金属・粗大ごみ' },
    { wd: '3火', name: '小物金属・粗大ごみ' },
    { wd: '水', name: '普通ごみ' },
    { wd: '木', name: 'なし' },
    { wd: '金', name: 'ビン,かん,PET,電池' },
    { wd: '土', name: '普通ごみ' },
  ],
}
