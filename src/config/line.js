import line from '@line/bot-sdk'

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const lineChannel = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
}

export const lineClient = new line.Client(lineChannel)

export const lineMiddleware = () => line.middleware(lineChannel)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const defaultResponse = { type: 'text', text: '申し訳ございません。入力内容に誤りがあります。' }

const restaurantImageColumn = {
  thumbnailImageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/134473/640x640_rect_134473480.jpg',
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
