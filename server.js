const fetch = require('node-fetch');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const Datastore = require('nedb');

app.use("/public", express.static('./public/'));
app.use(express.json({
    limit: '1mb'
}));

const database = new Datastore('search.db');
database.loadDatabase();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/api', async (req, res) => {
    console.log("request done")
    console.log(req.body)
    const data = await req.body;
    database.insert(data);
    res.json({
        status: "database push",
        data: data
    });
});

app.get('/search/:query', async (req, res) => {
    console.log("gifs done")
    const search = req.params.query;
    const api_url = 'http://api.giphy.com/v1/gifs/search?api_key=3kITzKZlZJpYRFgoHEeV2GRTTSrpH8Vh'
    const fetch_url = await fetch(api_url + '&q=' + search)
    const resp = await fetch_url.json()
        .then((resp) => {
            res.json(resp)
        })
        .catch((err) => {
            console.log("error" + err)
            return;
        });
});

app.listen(PORT, function () {
    console.log("listening port 5000");
});