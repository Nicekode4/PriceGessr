
    const url = 'https://fakestoreapi.com/products'
    const gameArt = document.querySelector('#gameArt')
    const gameSec = document.querySelector('#gameSec')
    let index = 0
    let random = 0
    let apiData;
    let point = 0
    let counter = 0
    
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
    gameSec.style.display = "block"
    document.querySelector('#startBtn').style.display = "none"
    random = Math.floor(Math.random() * parseInt(apiData[index].price * 6.99)) * 2;
    console.log(random);
    gameArt.innerHTML = `<img src="${apiData[index].image}" alt="">`
    
    document.querySelector('#randNum').innerText = random
    document.querySelector('#priceP').innerText = parseInt(apiData[index].price * 6.99) + " DKK"
}

function check(obj) {
    switch (obj.innerText) {
        case "Over":
            if (parseInt(apiData[index].price * 6.99) > random || parseInt(apiData[index].price * 6.99) === random) {
                

                if (counter < 11) {
                    obj.style.backgroundColor = "green"
                    point++
                 counter++  
                 document.querySelector("#counter").innerText = counter + "/10"
                 document.querySelector("#pointH2").innerText = point
                 setTimeout(() => {
                     obj.style.backgroundColor = "purple"
                     nextItem()
                 }, 1000);
                }else{
                    alert("You won!")
                }
                

            } else {
                alert("You lost")
                gameSec.style.display = "none"
                document.querySelector('#startBtn').style.display = "block"
            }
            break;
            case "Under":
                if (parseInt(apiData[index].price * 6.99) < random || parseInt(apiData[index].price * 6.99) === random) {
                    

                    if (counter < 11) {                    
                    obj.style.backgroundColor = "green"
                    point++
                        counter++  
                        document.querySelector("#counter").innerText = counter + "/10"
                        document.querySelector("#pointH2").innerText = point
                    setTimeout(() => {
                        obj.style.backgroundColor = "purple"
                        nextItem()
                    }, 1000);
                       }else{
                           alert("You won!")
                       }
                    
                }else {
                    alert("You lost")
                    gameSec.style.display = "none"
                    document.querySelector('#startBtn').style.display = "block"

            }
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

