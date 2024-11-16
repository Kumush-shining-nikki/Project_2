const { bot } = require("../index")

const WeatherKeyboard = async (msg) => {
    const chatId = msg.from.id

    if (msg.text === "🌤 Ob-havo") {
        bot.sendMessage(chatId, "Iltimos 📍 lakatsiyangizni yuboring", {
            reply_markup: {
                keyboard: [
                    [{
                        text: "📍 Lokatsiyani yuborish",
                        request_location: true
                    }],
                    ["Menyu"]
                ],
                resize_keyboard: true,
            }
        })
        
    }

    if (msg.text === "🌤 Погода") {
        bot.sendMessage(chatId, "Пожалуйста, пришлите свое 📍 местонахождениеg", {
            reply_markup: {
                keyboard: [
                    [{
                        text: "📍 Отправить местоположение",
                        request_location: true
                    }],
                    ["Меню"]
                ],
                resize_keyboard: true,
            }
        })
    }

    if (msg.text === "🌤 Weather") {
        bot.sendMessage(chatId, "Please send your 📍 lacation", {
            reply_markup: {
                keyboard: [
                    [{
                        text: "📍 Send location",
                        request_location: true
                    }],
                    ["Menu"]
                ],
                resize_keyboard: true,
            }
        })
    }
}

module.exports = WeatherKeyboard