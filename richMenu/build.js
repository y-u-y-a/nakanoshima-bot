import fs from 'fs'
import { client, richMenuConfig, imagePath } from './config.js'

async function build() {
  // init
  const list = await client.getRichMenuList()
  console.log('init >>>>>', list)
  for (let obj of list) {
    await client.deleteRichMenu(obj.richMenuId)
  }
  // create
  const richMenuId = await client.createRichMenu(richMenuConfig)
  console.log('richMenuId >>>>>', richMenuId)

  // Upload image
  await client.setRichMenuImage(richMenuId, fs.createReadStream(imagePath))

  // Set default richMenu
  await client.setDefaultRichMenu(richMenuId)

  // Confirm
  const richMenuList = await client.getRichMenuList()
  console.log('confirm >>>>>', richMenuList)
}

build()
