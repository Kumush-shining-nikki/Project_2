const { bot } = require("./index")
const { start, addContact } = require("./commands/command")
const { userMenu } = require("./commands/userMenu")
const { getAllUsers } = require("./commands/users")
const { Profile } = require("./commands/profil")
const adminMenyu = require("./commands/adminMenu")
const getWeatherRu = require("./commands/weather.ru")
const getWeatherEn = require("./commands/weather.en")
const getWeatherUz = require("./commands/weather.uz")
const WeatherKeyboard = require("./keyboards/weather")
const { getNewsUz } = require("./commands/news.uz")
const { getNewsRu } = require("./commands/news.ru")
const { getNewsEn } = require("./commands/news.en")
const User = require("./models/user")

bot.on("message" , async msg => {
    const chatId = msg.from.id
    const text = msg.text 
  
    const userResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`,
        {
          method: "GET",
        }
      );

      const userData = await userResponse.json();
    
    if (text === "/start") {
        start(msg)
    }

        
    if(userData[0]) {
        if (!userData[0].Phone_number && userData[0].Language) {
            addContact(msg)
        }
        
        if(userData[0].Role === "admin") {
            adminMenyu(msg)
            getAllUsers(msg),
            Profile(msg)
        } else {
            Profile(msg)
        }
        
        userMenu(msg)
        WeatherKeyboard(msg)
        getNewsUz(msg)
        getNewsRu(msg)
        getNewsEn(msg)

        if (msg.location && userData[0].Language === "O'zb") {
            getWeatherUz(msg)
        } else if (msg.location && userData[0].Language === "Rus") {
            getWeatherRu(msg)
        } else if (msg.location && userData[0].Language === "Eng") {
            getWeatherEn(msg)
        }
    }

})