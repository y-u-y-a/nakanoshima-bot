import line from '@line/bot-sdk'
import dotenv from 'dotenv'

dotenv.config()

// 変数 -----------------------------------------------------
const name = 'デフォルトメニュー'
const chatBarText = 'メニュー'
// ボタンの数を決定
const row = 2
const column = 2
// ---------------------------------------------------------
// リッチメニューのMAX
const maxWidth = 2500
const maxHeight = 1686
// 各ボタンの幅を取得
const width = maxWidth / column
const height = maxHeight / row
// 各ボタンの座標を取得(横: 最大3つ, 縦: 最大2つ)
const x = [(maxWidth / column) * 0, (maxWidth / column) * 1, (maxWidth / column) * 2]
const y = [(maxHeight / row) * 0, (maxHeight / row) * 1]

const area4 = [
  {
    bounds: { x: x[0], y: y[0], width, height },
    action: { type: 'message', text: 'ゴミ収集日' },
  },
  {
    bounds: { x: x[1], y: y[0], width, height },
    action: { type: 'message', text: '飲食店を探す' },
  },
  {
    bounds: { x: x[0], y: y[1], width, height },
    action: { type: 'uri', uri: 'https://tokubai.co.jp/%E3%82%B5%E3%83%9F%E3%83%83%E3%83%88/7238', label: 'サミット特売情報' },
  },
  {
    bounds: { x: x[1], y: y[1], width, height },
    action: { type: 'message', text: 'Coming soon ...' },
  },
]

export const richMenuConfig = {
  selected: true,
  name,
  chatBarText,
  size: { width: maxWidth, height: maxHeight },
  areas: area4,
}

export const imagePath = './richMenu/images/area4.png'

export const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})
