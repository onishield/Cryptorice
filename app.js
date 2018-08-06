// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const crypto = require('crypto');
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    msg = cipher(msg)
    reply(reply_token,msg)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token,msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {vW9pUoxPdHvnRCKpnFImHoFPbH4o063TB5EOisA6tcuskRxSbKvM7WQVCXZOSPXRas5qq3iXQK3m9pvuaaJ4l2S2ULDYkUqPX0fxRlo01qovMzhlvtj1Hy5DwIDIKJ0EcJPLzMDMjbRo+ALQRnipmQdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function cipher(msg){
    const cipher = crypto.createCipher('aes192', 'a password');
    let encrypted = cipher.update(msg, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function cut(msg){
    var res = msg.slice(0, 12)
}
