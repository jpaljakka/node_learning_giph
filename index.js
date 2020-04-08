var express = require('express');
var app = express();
var port = 8003;

app.use(express.static(__dirname + "/public"));
/*
app.post
app.get('/post?', function(req, res){
   res.get(localhost:5000/api/search/)
});
*/
console.log(__dirname);
app.get('/resume/download', function(req, res){
    res.download(__dirname + '/assets/Profile.pdf');
});

app.get("*", function(req, res){
    res.status(404).sendFile(__dirname + "/views/404.html"); 
});

app.listen(port, function(){
    console.log('listen on port ' + port)
});