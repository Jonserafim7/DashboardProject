// functions

async function getNewBackgroundImg() {

    try {
        const accessKey = "NOW_fQUyJNDfXjbWMn8fuZ5HF2p6oikzWB4h3PH3alc"
        const apiUrl = "https://api.unsplash.com/photos/random"
    
        const response = await fetch(`${apiUrl}?client_id=${accessKey}&query=city`)
        console.log(response.status)

        // if(!response.ok){
        //     throw new Error (`HTTP error! Status: ${response.status}`)
        // }

        const data = await response.json()
        console.log(data)
        document.body.style.backgroundImage = `url("${data.urls.regular}")`
        document.getElementById("bg-img-autor").textContent = `By: ${data.user.name}`
    }

    catch (error){
        console.error("Error fetching data:", error.message)
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1515106426117-7483c8b91e9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDAzOTB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDI1NjMxNTV8&ixlib=rb-4.0.3&q=80&w=1080")`
        document.getElementById("time-display").textContent = `Something went wrong`
    } 
}

async function getCryptoValue() {

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin`)
        
        const data = await response.json()
        
        const cryptoDataHTML = `
            <img class="crypto-img" src="${data.image.small}">
            <p>USD ${data.market_data.current_price.usd}</p>
        `
    
        document.getElementById("crypto-display").innerHTML = cryptoDataHTML
    }

    catch {
        console.error("Error fetching data:", error.message)
        document.getElementById("crypto-display").textContent = `Something went wrong`
    }
}


navigator.geolocation.getCurrentPosition((position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if(!res.ok){
                throw Error("Weather data noit available")
            }
            else {
                return res.json()
            }
        })
        .then(data => {
            console.log(data)

            const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather-display").innerHTML = `
            <div class="icon-temp-container">
                <img class="weather-icon" src="${iconURL}">
                <p>${Math.round(data.main.temp)}º</p>
            </div>
            <p>${data.name}</p> 
            `
        })
        .catch(err => console.error(err))
}));






function getCurrentTime() {
    // get the current date and time
    let now = new Date()

    // get the formatted time
    let formattedTime = now.toLocaleTimeString("en-US", {timeStyle: "short"})

    // display the formatted time in the designated html element
    document.getElementById("time-display").textContent = formattedTime
}



getCryptoValue()
setInterval(getCurrentTime, 1000) //update the time every second

// event listeners

document.getElementById("testbtn").addEventListener("click", getNewBackgroundImg)

