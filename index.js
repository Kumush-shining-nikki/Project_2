const TelegramBot = require("node-telegram-bot-api")
const bot = new TelegramBot(process.env.TOKEN, { polling: true })

bot.setMyCommands([
    {command: '/start', description: "Botni ishga tushirish"},
    {command: '/info', description: "Bot haqida ma'lumot"}
])

bot.onText(/\/info/, (msg) => {
    bot.sendMessage(msg.chat.id, `Bu bot Yangiliklar va Ob-havo malumotlarini ko'rsatadi.
Этот бот отображает новости и информацию о погоде.
This bot displays News and Weather information.`)
})

module.exports = {
    bot
}

require("./message")
require("./query")