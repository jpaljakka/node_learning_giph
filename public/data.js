/*
  postData =  async ()  => {
    console.log(date)
    const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const search = document.getElementById("search").value
    console.log(search)
    document.getElementById("search").textContent = search; // print it on screen
    document.getElementById("search_button")
    //make object for lat and lon
    const data = {
        date,
        search,
        data
    };
    //options for post method in fecth, header and body mostly important
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    const response = await fetch('/', options)
    const json_res = await response.json();
    console.log(json_res);
}




const api = `/search`;
const response = await fetch (api);
const json = await response.json();
console.log(json);
*/

// buttons




if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
        console.log(position.timestamp); //console log the position 
        console.log(position.coords.longitude); //console log the longitude
        const lat = position.coords.latitude; // declare the constant for lon and lat
        const lon = position.coords.longitude;
        const time = position.timestamp;
        const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        document.getElementById("latitude").textContent = lat; // print it on screen
        document.getElementById("longitude").textContent = lon;
        //make object for lat and lon
        const data = {
            date,
            search,
            data
        };
        //options for post method in fecth, header and body mostly important
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        
        const response = await fetch('/api', options)
        const json_res = await response.json();
        console.log(json_res);
    });
} else {
    console.log("NOT AVAILABLE")
}