const express = require('express');
const app = express(),
    responseTime = require('response-time'),
    axios = require('axios'),
    redis = require('redis'),
    port = process.env.PORT || 8000;


// records the time execution of I/O process
app.use(responseTime());

// connect redis client
const client = redis.createClient({ port: 6379, host: '127.0.0.1' });

// ON AVERAGE REDIS HAS 25 TIMES HIGHER PERFORMANCE THAN THE INITIAL REQUEST
(() => new Promise((resolve, reject) => {
    client.on('connect', () => resolve('Successful connection...'));
    client.on('err', () => reject(new Error('Unsuccessful Connection...')));
}))()
    .then(res => console.log(res))
    .catch(err => console.log(err))


app.get('/api/search', (req, res) => {
    const { query } = req.query;
    const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${query}`;

    (() => new Promise((resolve, reject) => {
        // wikipedia:query -> form that the data are stored in redis
        client.get(`wikipedia:${query}`, (err, data) => {
            if (err) reject(err)
            else resolve(data);
        })
    }))()
        .then(data => {
            // if data exist, pull it from redis or request it from API
            if (data)
                res.status(200).json({ 'Source': 'Cache', ...JSON.parse(data) });
            else
                return axios.get(wikipediaUrl);

        })
        .then(reqData => {
            if (reqData) {
                // store API data to redis
                client.set(`wikipedia:${query}`, JSON.stringify(reqData.data))
                // return API data
                res.status(200).json({ 'Source': 'API', ...reqData.data });
            }
        })
        .catch(err => console.log(err))
});

app.listen(port, () => console.log(`The app listens on port ${port}`));