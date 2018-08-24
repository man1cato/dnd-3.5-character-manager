const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));

app.post('/api', (req, res) => {
    console.log(req)
    res.json({
        user: 'Andres'
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
