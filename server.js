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
    console.log("POST - DONE")
    console.log(req.body)
    const response = await req.body;
    database.insert(response);
    res.json({
        response: response
    });
});

app.get('/search/:query', async (req, res) => {
    console.log("GET - DONE")
  
        const search = req.params.query;
        const api_key = '3kITzKZlZJpYRFgoHEeV2GRTTSrpH8Vh'
        const gif_url = 'http://api.giphy.com/v1/gifs/search?api_key=' + api_key;
        const fetch_gif = await fetch(gif_url + '&q=' + search)
        const resp_gif = await fetch_gif.json();
  
        const sticker_url = 'http://api.giphy.com/v1/stickers/search?api_key=' + api_key;
        const fetch_sticker = await fetch(sticker_url + '&q=' + search)
        const resp_sticker = await fetch_sticker.json();
        if(!resp_sticker) {
            resp_sticker === null
        }
        const data = {
            gif: resp_gif,
            sticker: resp_sticker
        }

        res.json(data);
   
});
app.listen(PORT, function () {
    console.log("listening port 5000");
});

