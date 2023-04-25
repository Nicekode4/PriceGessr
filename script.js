if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}
    const url = 'https://fakestoreapi.com/products'
    const gameArt = document.querySelector('#gameArt')
    const gameSec = document.querySelector('#gameSec')
    let index = 0
    let random = 0
    let apiData;
    let point = 0
    let counter = 0
    let lives = 3
    
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
        function resetGame() {
            gameSec.style.display = "block"
            document.querySelector('#preGame').style.display = "none"
            random = Math.floor(Math.random() * parseInt(apiData[index].price * 6.99)) * 2;
            console.log(random);
            gameArt.innerHTML = `<img src="${apiData[index].image}" alt="">`
                        point = 0
            counter = 0
            lives = 3
            document.querySelector('#randNum').innerText = random
            document.querySelector('#priceP').innerText = ""
            document.querySelector("#pointH2").innerText = point
            document.querySelector("#livesH2").innerText = lives
            document.querySelector("#counter").innerText = counter + "/10"

        }     
function startGame() {
    gameSec.style.display = "block"
    random = Math.floor(Math.random() * parseInt(apiData[index].price * 6.99)) * 2;
    console.log(random);
    gameArt.innerHTML = `<img src="${apiData[index].image}" alt="">`
    
    document.querySelector('#randNum').innerText = random
    document.querySelector('#priceP').innerText = ""
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
document.querySelector("#priceP").innerText = "Den rigtige pris: " + parseInt(apiData[index].price * 6.99) + " DKK"

                }else{
                    alert("You won!")
                }
                
                setTimeout(() => {
                    document.querySelector("#priceP").innerText = "" 
                    obj.style.backgroundColor = "purple"
                    nextItem()
                }, 1000);

            } else {
                if (lives < 2) {
                
                lives--
                document.querySelector("#livesH2").innerText = lives
                gameSec.style.display = "none"
                document.querySelector('#preGame').style.display = "block"
                alert("You lost")  
                }else{
                    lives--
                    document.querySelector("#livesH2").innerText = lives
                    obj.style.backgroundColor = "red"
                    document.querySelector("#priceP").innerText = "Den rigtige pris: " + parseInt(apiData[index].price * 6.99) + " DKK"
                    setTimeout(() => {
                        document.querySelector("#priceP").innerText = ""  
                        obj.style.backgroundColor = "purple"
                        nextItem()
                    }, 1000);
                }

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
                        document.querySelector("#priceP").innerText = "Den rigtige pris: " + parseInt(apiData[index].price * 6.99) + " DKK"
                        setTimeout(() => {
                            document.querySelector("#priceP").innerText = ""  
                        obj.style.backgroundColor = "purple"
                        nextItem()
                    }, 1000);
                       }else{
                           alert("You won!")
                       }
                    
                }else {
                    if (lives < 2) {
                        lives--
                        document.querySelector("#livesH2").innerText = lives
                        gameSec.style.display = "none"
                        document.querySelector('#preGame').style.display = "block"
                        alert("You lost")  
                        }else{
                            lives--
                            document.querySelector("#livesH2").innerText = lives
                            obj.style.backgroundColor = "red"
                            document.querySelector("#priceP").innerText = "Den rigtige pris: " + parseInt(apiData[index].price * 6.99) + " DKK"
                            setTimeout(() => {
                                document.querySelector("#priceP").innerText = "" 
                                obj.style.backgroundColor = "purple"
                                nextItem()
                            }, 1000);
                        }
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

