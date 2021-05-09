## package.json
- type: module
→ for 'import' instead 'require'


## リッチメニュー by Messaging API
```sh:
# 参考:
# https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/#creating-a-rich-menu-using-the-messaging-api
# https://developers.line.biz/ja/reference/messaging-api/#create-rich-menu
# http://richmenuapi-util.herokuapp.com/
# https://qiita.com/tetrapod117/items/b7a5083b6155bd91593f

# required: AccessToken & UserId
# リッチメニュー作成
curl -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer {{Access Token}}' \
-H 'Content-Type:application/json' \
-d \
"{
  'selected': true,
  'name': 'デフォルトメニュー',
  'chatBarText': 'メニュー',
  'size': { 'width': 2500, 'height': 1686 },
  'areas': [
    {
      'bounds': {
        'x': 0,
        'y': 0,
        'width': 1250,
        'height': 1686
      },
      'action': { 'type': 'message', 'text': 'ゴミ収集日' }
    },
    {
      'bounds': {
        'x': 1251,
        'y': 0,
        'width': 1250,
        'height': 1686
      },
      'action': { 'type': 'message', 'text': '近くの飲食店' }
    }
  ]
}"

# 画像アップロード(2500×1686)
curl -v -X POST https://api-data.line.me/v2/bot/richmenu/{{Rich Menu ID}}/content \
-H "Authorization: Bearer {{Access Token}}" \
-H "Content-Type: image/png" \
-T /Users/yuya/Pictures/開発/life-bot-menu.png

# デフォルトのリッチメニュー設定
curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/{{Rich Menu ID}} \
-H "Authorization: Bearer {{Access Token}}"

# リッチメニュー削除
curl -X DELETE \
-H 'Authorization: Bearer {{Access Token}}' \
https://api.line.me/v2/bot/richmenu/{{Rich Menu ID}}
```
