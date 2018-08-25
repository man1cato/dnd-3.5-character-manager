const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/api', (req, res) => {
    // res.send('Successful POST request');
    res.send(req.body);
});

app.get('/api', (req, res) => {
    res.send('Successful GET request');
}) 

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
