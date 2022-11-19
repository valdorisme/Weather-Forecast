const api = {key: "ad0c0bbd8a2bcd19f1ceba93db78197b",
baseurl: "https://api.openweathermap.org/data/2.5/"}

console.log(api.key)


// Adding event listener for when Enter key is pressed
const search = document.querySelector('.search-box');
search.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(search.value)
        console.log(search.value)
    }
}

function getResults (query) {
    // Fetching API
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=ad0c0bbd8a2bcd19f1ceba93db78197b`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);

}

// Results of when City name is typed in
function displayResults (weather) {
    var city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    var today = new Date();
    var date = document.querySelector('.location .date');
    date.innerText = dateBuilder(today);

    var temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°F</span>`

    var weatherTemp = document.querySelector('.current .weather');
    weatherTemp.innerText = weather.weather[0].main;

    var hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)} °F / ${Math.round(weather.main.temp_max)} °F`;

    document.querySelector('.day-box .date').textContent = date
    for (var i=0; i <5; i++) {
        document.getElementById(i).classList.add(today[i], temp[i], weatherTemp[i], hilow[i]);
}
    
}

// Incorporating local dates
function dateBuilder(d) {

    var month = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Gets day of the week using local time
    var days = day[d.getDay()];
    // Gets date using local time
    var date = d.getDate();
    // Gets month using local time
    var months = month[d.getMonth()];
    // Gets year using local time
    var year = d.getFullYear()

    return (`${days} ${date} ${months} ${year}`);
}

