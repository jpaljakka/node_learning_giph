

document.getElementById("search_button").addEventListener('click', async event => { // on-click event 
    event.preventDefault(); // prevent reloading page
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/'); //get date of search
    const searchTerm = document.getElementById("search").value; //search term
    const api_url = `/search/${searchTerm}` //local /search endpoint
    const request = await fetch(api_url)
    const response = await request.json()
    console.log(response)
    console.log(response.gifs.data[0].url)
    const data = response.gifs.data

  console.log(data)
 



  /*  // allocate all picture urls that has type gif

    let gif_url = data.reduce((acc, {id, url}) => {
      if (!url || !id)
        return {
            ...acc,
            [id]: url
           
        };

    }, {});
    console.log(gif_url)
});*/


    const post = {
            date,
            searchTerm,
            response,
            data
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

