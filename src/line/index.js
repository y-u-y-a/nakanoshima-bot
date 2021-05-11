import dotenv from 'dotenv'
import line from '@line/bot-sdk'

dotenv.config()
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const lineChannel = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
}

export const lineClient = new line.Client(lineChannel)

export const lineMiddleware = () => line.middleware(lineChannel)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const defaultResponse = { type: 'text', text: '申し訳ございません。入力内容に誤りがあります。' }

// テンプレートオブジェクトの定義
export const baseTemplate = {
  type: 'template',
  altText: 'メッセージを受信しました。',
  template: {},
}

export const carouselTemplate = {
  type: 'template',
  altText: 'メッセージを受信しました。',
  template: {
    type: 'carousel',
    imageAspectRatio: 'rectangle',
    imageSize: 'cover',
    columns: [],
  },
}
