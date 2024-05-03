const { error } = require("console");
const express = require("express");
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors')

const user = require('./user.json')

const app = express();


app.use(cors())

app.use(bodyParser.json());

app.listen(5000, () => {
    console.log(`Server start at 5000`);
});


app.post('/writeFile', (req, res)=>{
    const data = req.body
    if(Object.keys(data)=="winNum") {
        //вычленение номера
        const newNum = data.winNum
        //чтение текущих данных
        const winContacts = JSON.parse(fs.readFileSync('contacts.json'))
        //перезапись номера
        winContacts["win-staff"].winNum = newNum
        //конвертирование в строку
        const newData = JSON.stringify(winContacts)
        //запись в файл
        fs.writeFile('contacts.json', newData, (err)=>{
            if(err) {
                console.log(err)
            }
            console.log('success')
        })
    } else if (Object.keys(data)=="akdNum") {
        console.log("Akdor")
    } else if (Object.keys(data)=="stimulNum") {
        console.log('Stimul')
    }

    if(Object.keys(data)=="winMail") {
        //вычленение номера
        const newMail = data.winMail
        //чтение текущих данных
        const winContacts = JSON.parse(fs.readFileSync('contacts.json'))
        //перезапись номера
        winContacts["win-staff"].winMail = newMail
        //конвертирование в строку
        const newData = JSON.stringify(winContacts)
        //запись в файл
        fs.writeFile('contacts.json', newData, (err)=>{
            if(err) {
                console.log(err)
            }
            console.log('success')
        })
    } else if (Object.keys(data)=="akdMail") {
        console.log("Akdor")
    } else if (Object.keys(data)=="stimulMail") {
        console.log('Stimul')
    }



    res.send('ok')
 })

app.get('/readFile', (req, res)=>{
    // const num = fs.readFileSync('test.txt')
    const contacts = JSON.parse(fs.readFileSync('contacts.json'))

    setTimeout(()=>{
        res.json({
            winNum: contacts["win-staff"].winNum,
            winMail: contacts["win-staff"].winMail
        })
    },500)

    // setTimeout(()=>{
    //     res.json({
    //         contacts
    //     })
    // },1000)
})

app.post('/auth', (req, res)=>{
    const data = req.body
    if(data.login==user.admin.login&&data.password==user.admin.password) {
        res.json({
            isAdmin: true
        })
        console.log('confirm')
    } else {
        res.send('Пользователь не найден')
    }
})