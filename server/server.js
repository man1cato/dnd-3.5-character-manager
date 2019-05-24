const express = require('express')
const path = require('path')
// const bodyParser = require('body-parser')
// const {database} = require('../src/firebase/firebase-test')

const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 8080


app.use(express.static(publicPath))
// app.use(bodyParser.json())

// app.post('/api', (req, res) => {
//     // res.send('Successful POST request')
//     const body = req.body
//     database.ref(`test`).set({
//         body 
//     })
//     res.send(body)
// })

// app.get('/api', (req, res) => {
//     // res.send('Successful GET request')
//     database.ref(`test`).once('value').then((snapshot) => {
//         const users = snapshot.val()
//         res.send(users)
//     })
// }) 

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
