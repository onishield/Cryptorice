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
//    msg = msg
//    let msg2 = cipher(msg)
//    let msg3 = cut(msg)
    if((msg.toString().trim() === 'eat') || (msg.toString().trim() === 'Eat')){
        msg = randomEat();
        replyRandomEat(reply_token,msg);
    }
    else if((msg.toString().trim() === 'encrypte') || (msg.toString().trim() === 'Encrypte')){
        msg = msg
        let msg2 = cipher(msg)
        let msg3 = cut(msg)
        reply(reply_token,msg,msg2,msg3)
    }
    else{
        msg = 'Error command.'
        replyRandomEat(reply_token,msg);
    }
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token,msg,msg2,msg3) {
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
        },{
            type: 'text',
            text: msg3
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

function replyRandomEat(reply_token,msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {' + moduleCat.cat + '}'
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
    var temp = msg;
    for (var i = 0; i < 12; i++) {
    //  var index = Math.floor(Math.random() * temp.length - i);
    //  var item = temp.splice(index,1);
    //  temp.push(item);
      var newmsg = temp + i;
    }
    return newmsg;
}

function randomEat(){
    var pool = ['ร้านเขียว','หมูกรอบ','ร้านเห็ด','โรงสี่','โรงสาม','สวน'];
    var eat = pool[Math.floor(Math.random()*pool.length)];
    return eat;
}
