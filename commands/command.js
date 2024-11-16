const { bot } = require("../index");
const User = require("../models/user");
const Menu = require("./menu")

const currentDate = new Date()

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0') 
const day = String(currentDate.getDate()).padStart(2, '0')
const hours = String(currentDate.getHours()).padStart(2, '0')
const minutes = String(currentDate.getMinutes()).padStart(2, '0')
const seconds = String(currentDate.getSeconds()).padStart(2, '0')

const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`

const start = async (msg) => {
    const chatId = msg.from.id;

    const userResponse = await fetch(`https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`, {
        method: 'GET'
    });

    const userData = await userResponse.json();

    if (userData.length === 0) {
        const newUserResponse = await fetch(`https://sheetdb.io/api/v1/${process.env.DB_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "data": {
                    "Firstname": msg.from.first_name,
                    "Lastname": msg.from.last_name,
                    "Username": msg.from.username,
                    "ChatId": msg.from.id,
                    "Phone_number": "",
                    "Role": "user",
                    "Language": "",
                    "CreatedAt": formattedDate
                }
            })
        });

        const newUserData = await newUserResponse.json();
        console.log(newUserData);
        
        // let user = await User.findOne({ userId });
        // if (!user) {
        //   user = new User({
        //     userId,
        //     FirstName: msg.from.first_name,
        //     LastName: msg.from.last_name,
        //     Username: msg.from.username,
        //   });
        //   await user.save();
      
        //     bot.sendMessage(process.env.TELEGRAM_CHANNEL_ID, `Yangi foydalanuvchi:\nIsm: ${msg.from.first_name}\nUsername: @${msg.from.username}\nID: ${userId}\nVaqt: ${new Date().toLocaleString()}`);
    //   }


        bot.sendMessage(chatId, 
`Tilni tanlang. 
Выберите язык. 
Select a language.`, 
        {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🇺🇿 O'zb",
                        callback_data: "O'zbek tili"
                    }],
                    [{
                        text: "🇷🇺 Rus",
                        callback_data: "Rus tili"
                    },
                    {
                        text: "🇬🇧 Eng",
                        callback_data: "Ingliz tili"
                    }]
                ],
            }
        });
    } else {
        bot.sendMessage(chatId, 
`Tilni tanlang.
Выберите язык.
Select a language.`, 
        {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🇺🇿 O'zb",
                        callback_data: "O'zbek tili"
                    }],
                    [{
                        text: "🇷🇺 Rus",
                        callback_data: "Rus tili"
                    },
                    {
                        text: "🇬🇧 Eng",
                        callback_data: "Ingliz tili"
                    }]
                ],
            }
        });
        
        if (userData[0].Language) {
           Menu(msg)
        }
    }
}

const addContact = async (msg) => {
    const chatId = msg.from.id;
    const adminNumbers = ["+998904385114"];
  
    try {
      const userResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`,
        {
          method: "GET",
        }
      );
  
      const userData = await userResponse.json();
  
      if (msg.contact && msg.contact.phone_number) {
        const isAdmin = adminNumbers.includes(msg.contact.phone_number);
        const role = isAdmin ? "admin" : "user";
  
        const newUserResponse = await fetch(
          `https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                "Phone_number": msg.contact.phone_number,
                "Role": role,
              },
            }),
          }
        );
  
        const newUserData = await newUserResponse.json();
        console.log(newUserData);
  
        switch (userData[0].Language) {
          case "O'zb":
            bot.sendMessage(chatId, "Botdan to'liq foydalanish uchun Menyuni bosing", {
              reply_markup: {
                keyboard: [[{ text: "Menyu" }]],
                resize_keyboard: true,
              },
            });
            break;
          case "Rus":
            bot.sendMessage(chatId, "Нажмите «Меню», чтобы полностью использовать бота.", {
              reply_markup: {
                keyboard: [[{ text: "Меню" }]],
                resize_keyboard: true,
              },
            });
            break;
          case "Eng":
            bot.sendMessage(chatId, "Click the Menu button to fully utilize the bot", {
              reply_markup: {
                keyboard: [[{ text: "Menu" }]],
                resize_keyboard: true,
              },
            });
            break;
          default:
            bot.sendMessage(chatId, "Til sozlamalarini aniqlashda xatolik yuz berdi.");
        }
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      bot.sendMessage(chatId, "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    }
  };
  
module.exports = { start, addContact }