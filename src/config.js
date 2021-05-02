import line from '@line/bot-sdk'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

const lineChannel = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
}

const lineClient = new line.Client(lineChannel)

export { PORT, line, lineChannel, lineClient }
