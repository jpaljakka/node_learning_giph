const fetch = require('node-fetch');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

//database vonfig
mongoose.connect('mongodb://localhost:27017/learning-mongodb', {useNewUrlParser: true});

const db = mongoose.connection;  // mongoose error handling
db.on('error', (err)=>{
    console.log('error has occurred with database ' + err);
})
db.on('open', ()=>{
    console.log('connection to db success');
});
//schemas
const Schema = mongoose.Schema;

const gifSchema = new Schema({
    date: String,
    searchTerm: String,
    gif_url: Object,
    sticker_url: Object
    
});

const Gif = mongoose.model('Gif', gifSchema);

// endpoints starts here
app.use("/public", express.static('./public/'));
app.use(express.json({
    limit: '1mb'
}));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//post from front end, saving data to database
app.post('/api', async (req, res) => {
    console.log("POST - DONE")
    console.log(req.body)
    const response = await req.body;
    const date = await response.date;
    const searchTerm = await response.searchTerm
    const gif_url = await response.gif_url
    const sticker_url = await response.sticker_url

    const newGif = new Gif
    newGif.date = date
    newGif.searchTerm = searchTerm
    newGif.gif_url = gif_url
    newGif.sticker_url = sticker_url
    newGif.save();
    res.json({
        response: response,
    });
});
//get request to giphy url
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
 // ToDo use Promise.all here also i need to add more error handling to back end api request with .then and .catch      
        const data = {
            gif: resp_gif,
            sticker: resp_sticker
        }
        

    res.json(data);
    console.log(data)
    

});
app.listen(PORT, function () {
    console.log("listening port 5000");
});

