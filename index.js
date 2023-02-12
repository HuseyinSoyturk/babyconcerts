const { default: axios } = require("axios");
const cron = require('node-cron');
const nodemailer = require('nodemailer');

async function name() {
    console.log('Istekler Basladi');
    try {
        const response = await axios('https://mobilet.com/_next/data/zknB8r_WcCZzZ_o2xhN1c/tr/search.json?text=Babyconcerts')
        if (response.data.pageProps && response.data.pageProps.searchResult && response.data.pageProps.searchResult.eventCards) {
            const eventCards = response.data.pageProps.searchResult.eventCards
            const condition = eventCards.some(obj => obj.href !== '/event/17453')
            if (condition) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'soyturk.huseyin61@gmail.com',
                        pass: 'gufdchiagjpxifcz'
                    }
                });

                var mailOptions = {
                    from: 'soyturk.huseyin61@gmail.com',
                    to: 'soyturk.huseyin61@gmail.com',
                    subject: 'BabyConcerts Onemli !!!!',
                    text: JSON.stringify(response.data.hits)
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        }

        const response2 = await axios('https://mobilet.com/_next/data/zknB8r_WcCZzZ_o2xhN1c/tr/search.json?text=Konuşanlar - Hasan Can Kaya')
        if (response2.data.pageProps && response2.data.pageProps.searchResult && response2.data.pageProps.searchResult.eventCards) {
            const eventCards = response2.data.pageProps.searchResult.eventCards
            const condition = eventCards.length > 0
            if (condition) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'soyturk.huseyin61@gmail.com',
                        pass: 'gufdchiagjpxifcz'
                    }
                });

                var mailOptions = {
                    from: 'soyturk.huseyin61@gmail.com',
                    to: 'soyturk.huseyin61@gmail.com',
                    subject: 'Konuşanlar Onemli !!!!',
                    text: JSON.stringify(response.data.hits)
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

cron.schedule('*/5 * * * *', () => {
    name();
});


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);
