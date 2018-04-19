const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const aqiRating = require('./data/aqiRating.json');
const measurementParams = require('./data/measurementParams.json');

const { AQICN_TOKEN } = process.env;
const AQICN_URL_SEARCH = 'https://api.waqi.info/search/?keyword=';
const AQICN_URL_FEED = 'https://api.waqi.info/feed/';

const app = express();
const port = process.env.PORT || 3002;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
}

function checkAqi(aqi) {
    return !!parseInt(aqi, 10);
}

function getRatingData(aqi) {
    let returnObj;

    for (let rating in aqiRating) {

        if (aqi >= parseInt(rating, 10)) {
            returnObj = {
                rating: aqiRating[rating]["rating"],
                description: aqiRating[rating]["description"],
                color: aqiRating[rating]["tag"]
            }
        }
    }

    return returnObj;
}

app.get('/api/search/:keyword', async (req, res) => {
    let { keyword } = req.params;
    let response;
    let data;

    try {
        response = await fetch(`${AQICN_URL_SEARCH}${encodeURI(keyword)}&token=${AQICN_TOKEN}`);

        if (response.ok) {
            data = await response.json();
            data = await data.data;

            data = data.filter((item) => {
                return checkAqi(item.aqi);
            });

            data = data.map((item) => {
               return Object.assign(
                   item,
                   {
                       color: getRatingData(item.aqi).color
                   }
               )
            });
        } else {
            throw new Error('Data could not be fetched from server');
        }

        res.send(data);
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
        for (let i = 0; i < 3; i++) {
            response = await fetch(`${AQICN_URL_FEED}@${encodeURI(id)}/?token=${ AQICN_TOKEN }`);
            data = await response.json();
            data = data.data;

            if (!!data) {
                break;
            }
        }

        data = Object.assign(
            data,
            getRatingData(data.aqi)
        );

        for (let prop in data.iaqi) {

            if (measurementParams.hasOwnProperty(prop)) {
                data.iaqi[prop].name = measurementParams[prop];
            } else {
                delete data.iaqi[prop];
            }
        }

        res.send(data);
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
