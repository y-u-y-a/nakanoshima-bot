import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT

export const WEEKDAY_LIST = ['日', '月', '火', '水', '木', '金', '土']

export const regExp = {
    test: /テスト|サンプル/,
    garbagesIndex: /garbagesIndex|ごみ|ゴミ|収集日/,
    eventsIndex: /eventsIndex|イベント/,
    eventsCreate: /eventsCreate/,
}

export const garbageConf = {
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
