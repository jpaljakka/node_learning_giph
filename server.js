const fetch = require('node-fetch');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

function handleJSON(json){
	if (!json.data) {
		return;
	}
	var result = [],
		counter = json.data.length;

	while(counter--){
		try {
			result.push(json.data[counter].images.original.url);
		} catch {
			console.log('An error has occurred while processing GIHPY response');
		}	
	}
	return result;
}

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
    response: Object
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
    
    const newGif = new Gif
    newGif.response = response
    newGif.date = date
    newGif.searchTerm = searchTerm
    newGif.save();
    res.json({
        giphy_resp: response
    });
});

//get request to giphy url
app.get('/search/:query', async (req, res) => {
    console.log("GET - DONE")
    const search = req.params.query;
    const api_key = '3kITzKZlZJpYRFgoHEeV2GRTTSrpH8Vh'
        const gif_data  = await fetch(
            'http://api.giphy.com/v1/gifs/search?api_key=' + api_key + '&q=' + search,
        )
            .then((res) => res.json())

    const sticker_data= await fetch (
            'http://api.giphy.com/v1/stickers/search?api_key=' + api_key + '&q=' + search,
        )
            .then((res) => res.json())

        Promise.all([sticker_data, gif_data])

        .then((response) => {
            
           res.send({
            gifs: response[0],
            stickers: response[1]
           })
           console.log(response[0].data[0].url)
          })
       
        .catch((err) => new Error(err));
        
    });

app.listen(PORT, function () {
    console.log("listening port 5000");
});

