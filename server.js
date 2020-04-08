const fetch = require('node-fetch');
const express = require('express');
const app = express();
const api = 'http://api.giphy.com/v1/gifs/search?api_key=3kITzKZlZJpYRFgoHEeV2GRTTSrpH8Vh'
const PORT = process.env.PORT || 5000;


app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post ('/api', async(req, res) => {
    console.log("requested")
    await console.log(req.body)
    
    const lon = req.body.lon
    const lat = req.body.lat
    const time = req.body.time
    const date = req.body.date
    res.json({
        status: "success",
        latitude: lat,
        longitude: lon,
        time: time,
        date: date
    });
    });

// dont touch here

app.get ('/search' , async (req, res) => {
    console.log("request")
    await console.log(req.params)
    const api_request = await fetch(api, {
        method: 'GET'
    })
    

    .then ((response) => {
    return response.json();
    })
    .then((json) => {
        console.log(json.pagination)
        console.log(json.data)
        const json_data = json.pagination
        const date = req.body.date
        res.json({
            status: "success",
            date: date,
            data: json_data
        })

    })

    .catch((err) => {
        console.log("ERROR")
    });
});

//works dont touch here yet
app.get ('/search/:query/' , async (req, res) => {
console.log("request")
await console.log(req.params)

const search = req.params.query;
let json = await fetch(api + '&q=' + search, {
    method: 'GET'
})
.then ((response) => {
return response.json();

})
.then((json) => {
    console.log(json.pagination)
    console.log(json.data)
    const json_data = json.data
    const date = req.body.date
    res.json({
        status: "success",
        date: date,
        data: json_data
    })
})
.catch((err) => {
    console.log("ERROR")
});

});


app.listen(PORT, function () {
    console.log("listening port 5000");
  });