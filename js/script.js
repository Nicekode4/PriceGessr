
    const url = 'https://fakestoreapi.com/products'
    const gameArt = document.querySelector('#gameArt')
    let index = 0
    let random = 0
    let apiData;
    
    fetch(url)
        .then(response => {
            return response.json();
            //parsing our data
        })
        .then(data => {
            console.log(data);
            apiData = data
            //Our parsed data
        })
        .catch(error => {
            console.log(error);
            //On error
        })
        .finally(() => {
            console.log(apiData);

        })
function startGame() {
    document.querySelector('#startBtn').style.display = "none"
    random = Math.floor(Math.random() * parseInt(apiData[index].price));
    gameArt.innerHTML = `<img src="${apiData[index].image}" alt="">`
    console.log("Rigtigt");
    document.querySelector('#randNum').innerText = "Er " + " er den rigtige pris over eller under " + random + " DKK"
    document.querySelector('#priceP').innerText = parseInt(apiData[index].price * 6.99) + " DKK"
}

function check(obj) {
    switch (obj.innerText) {
        case "Over":
            if (parseInt(apiData[index].price) > random) {
                nextItem()
            } else {console.log("Wrong");}
            break;
            case "Under":
                if (parseInt(apiData[index].price) < random) {
                    nextItem()
                }else {console.log("Wrong");}
                break;
                case "Det er prisen":
                    if (parseInt(apiData[index].price) === random) {
                        nextItem()
                    } else {console.log("Wrong");}
                    break;
        default:
            console.log("Wrong");
            break;
    }
}

function nextItem() {
    index = Math.floor(Math.random() * apiData.length) + 1;
    startGame()
}

