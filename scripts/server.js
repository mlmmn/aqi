const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const { AQICN_TOKEN } = process.env;
const AQICN_URL_SEARCH = 'https://api.waqi.info/search/?keyword=';
const AQICN_URL_FEED = 'https://api.waqi.info/feed/';

const app = express();
const port = process.env.PORT || 3002;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
}

app.get('/api/search/:keyword', async (req, res) => {
    let { keyword } = req.params;
    let response;
    let data;

    try {
        response = await fetch(`${AQICN_URL_SEARCH}${encodeURI(keyword)}&token=${AQICN_TOKEN}`);

        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error('Data could not be fetched from server');
        }

        res.send(data.data);
    }
    catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
});

app.get('/api/getstation/:id', async (req, res) => {
    let { id } = req.params;
    let response;
    let data;

    try {
        response = await fetch(`${AQICN_URL_FEED}@${encodeURI(id)}/?token=${ AQICN_TOKEN }`)

        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error('Data could not be fetched from server');
        }

        res.send(data.data);
    }
    catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
