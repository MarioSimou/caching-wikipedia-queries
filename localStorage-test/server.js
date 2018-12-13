const express = require('express');
const app = express(),
    responseTime = require('response-time'),
    axios = require('axios'),
    port = process.env.PORT || 8000,
    path = require('path');

// set ejs template/view engine
app.set('view engine', 'ejs');
// set Static files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/search', (req, res) => {
    const { query } = req.query;
    res.render('index.ejs', {
        query: query
    }); 
});

app.listen(port, () => { console.log(`The app listens on port ${port}`) });