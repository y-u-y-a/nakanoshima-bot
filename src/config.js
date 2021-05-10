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

const restaurantImageColumn = {
  thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
  imageBackgroundColor: '#FFFFFF',
  title: 'デリマハル',
  text: 'カレーとナンを提供する食べログ評価3.7という高評価のお店。',
  defaultAction: {
    type: 'uri',
    label: 'お店を確認する',
    uri: 'http://example.com/page/123',
  },
  actions: [
    {
      type: 'uri',
      label: 'お店を確認する',
      uri: 'http://example.com/page/111',
    },
  ],
}

export const locationButtonTemplate = {
  type: 'template',
  altText: '飲食店を探すから位置情報を送ってね！',
  template: {
    type: 'buttons',
    text: '飲食店を探すから位置情報を送ってね！',
    actions: [{ type: 'location', label: '位置情報' }],
  },
}

export const restaurantCarouselTemplate = {
  type: 'template',
  altText: 'レストラン一覧を受信しました。',
  template: {
    type: 'carousel',
    imageAspectRatio: 'rectangle',
    imageSize: 'cover',
    columns: [restaurantImageColumn, restaurantImageColumn, restaurantImageColumn],
  },
}

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
