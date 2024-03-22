const express = require('express');
require('dotenv').config();
const apicache = require('apicache');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (apiKey && apiKey === API_KEY) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

app.use(express.json());
const cache = apicache.middleware;

app.get('/', cache('1 minutes'), (req, res) => {
    let total = 0;
    for (let i = 1; i < 1000000000; i++) {
        total += i;
    }
    return res.json(total);
});

app.get('/data', apiKeyMiddleware, (req, res) => {
    res.json({ message: 'Secret data here' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
