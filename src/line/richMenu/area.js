// 変数 -----------------------------------------------------
// ボタンの数を決定
const [row, column] = [2, 2]
// リッチメニューのMAX
export const [maxWidth, maxHeight] = [2500, 1686]
// ---------------------------------------------------------

// 各ボタンの幅を取得
const width = maxWidth / column
const height = maxHeight / row
// 各ボタンの座標を取得(横: 最大3つ, 縦: 最大2つ)
const x = [(maxWidth / column) * 0, (maxWidth / column) * 1, (maxWidth / column) * 2]
const y = [(maxHeight / row) * 0, (maxHeight / row) * 1]

// エリア ---------------------------------------------------
export const area4 = [
  // A
  {
    bounds: { x: x[0], y: y[0], width, height },
    action: { type: 'message', text: 'ゴミ収集日' },
  },
  // B
  {
    bounds: { x: x[1], y: y[0], width, height },
    action: { type: 'message', text: 'イベント一覧' },
  },
  // C
  {
    bounds: { x: x[0], y: y[1], width, height },
    action: { type: 'uri', uri: 'https://tokubai.co.jp/%E3%82%B5%E3%83%9F%E3%83%83%E3%83%88/7238', label: 'サミット特売情報' },
  },
  // D
  {
    bounds: { x: x[1], y: y[1], width, height },
    action: { type: 'message', text: 'サンプル' },
  },
]

export const richMenuConfig = {
  selected: true,
  name: 'デフォルトメニュー',
  chatBarText: 'メニュー',
  size: { width: maxWidth, height: maxHeight },
  areas: area4,
}
export const imagePath = './src/images/area4.png'
