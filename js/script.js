const api = {key: "ad0c0bbd8a2bcd19f1ceba93db78197b",
baseurl: "https://api.openweathermap.org/data/2.5/"
}

console.log(api.key)


const search = document.querySelector('.search-box');
search.addEventListener('keypress', setQuery);

function setQuery(event) {
    // Added event listener for 'enter' key
    if (event.keyCode == 13) {
        getResults(search.value)
    }
}

function getResults (query) {
    // Make sure weather is returned in degrees Fahrenheit
    fetch('${api.base}weather?q=${query}&units=imperial&APPID=${api.key}')
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    var city = document.querySelector('.location .city');
    city.innerText = '${weather.name}, ${weather.sys.country}';

    var today = new Date();
    var date = document.querySelector('.location . date');
    date.innerText = dateBuilder(today);
}

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

    return '${days} ${date} ${months} ${year}';

}
