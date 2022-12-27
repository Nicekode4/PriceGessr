
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
    random = Math.floor(Math.random() * parseInt(apiData[index].price * 6.99)) * 2;
    console.log(random);
    gameArt.innerHTML = `<img src="${apiData[index].image}" alt="">`
    
    document.querySelector('#randNum').innerText = random + " DKK"
    document.querySelector('#priceP').innerText = parseInt(apiData[index].price * 6.99) + " DKK"
}

function check(obj) {
    switch (obj.innerText) {
        case "Over":
            if (parseInt(apiData[index].price * 6.99) > random) {
                nextItem()
            } else {console.log("Wrong");}
            break;
            case "Under":
                if (parseInt(apiData[index].price * 6.99) < random) {
                    nextItem()
                }else {console.log("Wrong");}
                break;
                case "Det er prisen":
                    if (parseInt(apiData[index].price * 6.99) === random) {
                        nextItem()
                    } else {console.log("Wrong");}
                    break;
        default:
            console.log("Wrong");
            break;
    }
}

function nextItem() {
    console.log("Rigtigt");
    index = Math.floor(Math.random() * apiData.length) + 1;
    startGame()
}

