// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const crypto = require('crypto');
var moduleCat = require( "./cat.js" );
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    msg = msg
    msg2 = cipher(msg)
    reply(reply_token,msg,msg2)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token,msg,msg2) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {' + moduleCat.cat + '}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        },{
            type: 'text',
            text: msg2
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
    var temp = msg;
    for (var i = 0; i < 12; i++) {
    //  var index = Math.floor(Math.random() * temp.length - i);
    //  var item = temp.splice(index,1);
    //  temp.push(item);
      var newmsg = temp + i;
    }
    return newmsg;
}
