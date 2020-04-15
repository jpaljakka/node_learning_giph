document.getElementById("search_button").addEventListener('click', async event => { // on-click event 
    event.preventDefault(); // prevent reloading page
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/'); //get date of search
    const searchTerm = document.getElementById("search").value; //search term
    const api_url = `/search/${searchTerm}` //local /search endpoint
    const request = await fetch(api_url); // fetch endpoint
    const response = await request.json(); // response of endpoint
    const gifs = response.gif;
    const stickers = response.sticker

    // allocate all picture urls that has type gif

    let gif_url = gifs.data.reduce((acc, {url, title}) => {
        if (!url || !title) {
            return acc;
        }
        return {
            ...acc,
            [title]: url
        };

    }, {});

    let sticker_url = stickers.data.reduce((acc, {url}) => {
        if (!url) {
            return acc;
        }
        return {
            ...acc,
        url
            
            
        };

    }, {});
    let stick = [sticker_url];
    stick.forEach((img)=>{
        console.log(img)
    })
  
    
console.log(response)

    const post = {
            date,
            searchTerm,
            gif_url,
            sticker_url
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    };

    const db_response = await fetch('/api', options)
    const db_json = await db_response.json();
    console.log(db_json);
});

