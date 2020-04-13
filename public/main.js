document.getElementById("search_button").addEventListener('click', async event => { // on-click event 
    event.preventDefault(); // prevent reloading page
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/'); //get date of search
    const searchTerm = document.getElementById("search").value; //search term
    const api_url = `/search/${searchTerm}` //local /search endpoint
    const request = await fetch(api_url); // fetch endpoint
    const response = await request.json(); // response of endpoint
    
    // allocate all picture urls that has type gif
    let gif_url = response.data.reduce((acc, {
        url,
        type
    }) => {
        if (!url || !type) {
            return acc;
        }
        return {
            ...acc,
            [url]: type
        };
    }, {});

    const data = {
        date,
         searchTerm,
        gif_url
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const db_response = await fetch('/api', options)
    const db_json = await db_response.json();
    console.log(db_json);
});
