import fs from 'fs'
import { lineClient } from '../line.js'
import { imagePath, richMenuConfig } from './area.js'

class RichMenu {
  async init() {
    const list = await lineClient.getRichMenuList()
    console.log('init >>>>>', list)
    for (let obj of list) {
      await lineClient.deleteRichMenu(obj.richMenuId)
    }
  }

  async build() {
    await this.init()
    // create
    const richMenuId = await lineClient.createRichMenu(richMenuConfig)
    console.log('richMenuId >>>>>', richMenuId)

    // Upload image
    await lineClient.setRichMenuImage(richMenuId, fs.createReadStream(imagePath))

    // Set default richMenu
    await lineClient.setDefaultRichMenu(richMenuId)

    // Confirm
    const richMenuList = await lineClient.getRichMenuList()
    console.log('confirm >>>>>', richMenuList)
  }
}

const richMenu = new RichMenu()
richMenu.build()
