## package.json
- type: module
→ for 'import' instead 'require'

## Deploy flow
```sh
$ heroku git:remote -a nakanoshima-bot
```
### 環境変数確認
```sh
$ heroku config --app nakanoshima-bot
```


## リッチメニュー by Messaging API
### 参考:
- https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/#creating-a-rich-menu-using-the-messaging-api
- https://developers.line.biz/ja/reference/messaging-api/#create-rich-menu
- http://richmenuapi-util.herokuapp.com/
- https://qiita.com/tetrapod117/items/b7a5083b6155bd91593f
