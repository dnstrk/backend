const { error } = require("console");
const express = require("express");
const fs = require('fs')
const bodyParser = require('body-parser');

const app = express();



app.use(bodyParser.json());

app.listen(5000, () => {
    console.log(`Server start at 5000`);
});

// app.get('/writeFile', (req, res)=>{
//     fs.writeFile('test.txt', '123456', (err)=>{
//         if(err) {
//             console.log(err)
//         }
//         console.log('success')
//     })
// })
app.post('/writeFile', (req, res)=>{
    const {num} = req.body
    fs.writeFile('test.txt', num, (err)=>{
        if(err) {
            console.log(err)
        }
        console.log('success')
    })
})

app.get('/readFile', (req, res)=>{
    const num = fs.readFileSync('test.txt')

    res.json({
        num: num.toString()
    })
})