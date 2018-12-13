// As expected it avoids the I/O process, which roughly save 1.5sec each time

(()=> {
    // Global variables
    const wikipediaUrl = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=';
    const query = document.querySelector('#query').textContent;
    const searchQuery = `wikipedia:${query}`;
    const content = document.querySelector('#content');
    
    if(localStorage && localStorage.getItem(searchQuery)){
        // returns data in the view
        content.textContent = localStorage.getItem(searchQuery);
    }else{
        // returns a promise, which is immediate is executed
        fetch(`${wikipediaUrl}${query}`, {method : 'GET'})
        .then( data => data.json())
        .then( data => {
            // set data to the local storage
            localStorage.setItem(searchQuery,JSON.stringify(data.parse.text));
            // returns data in the view
            content.textContent = JSON.stringify(data.parse.text);
        })
        .catch(err => console.log(err));
    }

})()


