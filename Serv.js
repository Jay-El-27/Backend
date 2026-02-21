require('dotenv').config ()

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
    const time = JSON.stringify(req.method + req.url + new Date())
    console.log(time);
    next();
});

app.get('/', (req, res) => {
    res.send('My Week 2 API!');
});

app.post('/user', (req, res) => {
    const { name, email } = req.body;
if (!name || !email) return res.status(400).json({ error: 'Missing Fields'});
const str = JSON.stringify(name)
res.status(201).json({ message: 'Hello ' + str});
});

app.get('/user/:id', (req, res) => {
    res.json({ id: req.params.id, name: 'Sample User'});
});

app.listen(3000, () => console.log('API live'));