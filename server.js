const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

const fakeUser = {
    "username": "testuser",
    "password": "zemoso@123",
    "accessToken" : "fake-access-token"
};

const locations = [
    { id: 1, lat: 40.712776, lng: -74.005974},
    { id: 2, lat: 42.360081, lng: -71.058884},
    { id: 3, lat: 29.760427, lng: -95.369804}
];

const CONTENT_TYPE_HEADER = 'content-type';
const AUTHORIZATION_HEADER = 'Authorization';


const isLat = (lat) => !Number.isNaN(lat) && lat > -90 && lat < 90;
const isLng = (lng) => !Number.isNaN(lng) && lng > -180 && lng < 180;

app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;

    const contentType = req.header(CONTENT_TYPE_HEADER);

    if (contentType === 'application/json'
        && username === fakeUser.username
        && password === fakeUser.password) {
        res.send({ "access_token" : fakeUser.accessToken });
    } else {
        res.sendStatus(401);
    }
});


app.get('/locations', (req, res) => {
    const authHeader = req.header(AUTHORIZATION_HEADER);
    if (!authHeader || authHeader !== fakeUser.accessToken) {
        res.sendStatus(401);
    } else {
        res.send(locations);
    }
});

app.post('/locations', (req, res) => {
    const authHeader = req.header(AUTHORIZATION_HEADER);
    if (!authHeader || authHeader !== fakeUser.accessToken) {
        res.sendStatus(401);
    } else {
        const lat = parseFloat(req.body.lat);
        const lng = parseFloat(req.body.lng);

        if (!isLat(lat) || !isLng(lng)) {
            res.sendStatus(400);
        } else {
            locations.push({ id: locations.length + 1, lat, lng });
            res.status(201).send(locations[locations.length - 1]);
        }
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));