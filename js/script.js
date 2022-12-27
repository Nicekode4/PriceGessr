console.log("lol");
    const url = 'https://fakestoreapi.com/products'
    let apiData;
    
    fetch(url)
        .then(response => {
            return response.json();
            //parsing our data
        })
        .then(data => {
            console.log(data);
            data = apiData
            //Our parsed data
        })
        .catch(error => {
            console.log(error);
            //On error
        })
        .finally(() => {
            console.log(apiData);
        })

        console.log("lol");