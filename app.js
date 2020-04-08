const Telegram = require('telegraf/telegram')
const cron = require('node-cron-no-open-collective');
const axios = require('axios');
require('dotenv').config();

const telegram = new Telegram(process.env.BOT_TOKEN)

console.log('Bot is Running!');

const blastMessage = async (message) => {
    const dataBot = await new Promise((resolve, reject) => {
        // Make a request for a user with a given ID
        axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getUpdates`)
            .then(function (response) {
                // handle success
                resolve(response.data.result);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                reject(error);
            });
    });

    for (const value of dataBot) {
        if (value.message.chat.type === 'group') {
            telegram.sendMessage(value.message.chat.id, message);
        }
    }
}

const cronJob = (message = "Saya adalah bot pengingat, saya ada!", hour, minute) => {
    cron.schedule(`${minute} ${hour} * * *`, () => {
        blastMessage(message);
    }, {
        scheduled: true,
        timezone: 'Asia/Jakarta'
    });
}

// Job 1
cronJob("Sampurasun, good morning. Geura hudang ulah sare wae, sing semangat atuh! Ulah sampe telat nya!", 07, 00);
// Job 2
cronJob("15 menit deui jam asup gawe, ulah sampe poho absen asup nya!", 07, 45);
// Job 3
cronJob("Barudak ayeuna geus jam 5, geura isi timesheet na ulah sampe poho, absen balik ongkoh tapi kudu leuwih ti 8 jam nya! Hiji deui push jeung merge request gawean na!", 05, 00);
