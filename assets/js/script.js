var typedLocation
var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
loadSearches();
var typedCityField = document.getElementById("btn-search").addEventListener("click", function (event) {
    event.preventDefault()
    typedLocation = document.getElementById("search-box").value;
    console.log(savedCities);
    savedCities.push(typedLocation);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    getWeatherFromCityName(typedLocation);
    console.log(savedCities);
});
var previousSearchesEl = document.getElementById("previous-searches");
var cityNameEl = document.getElementById("city-name");
var weatherDescriptionEl = document.getElementById("weather-description");
var windspeedEl = document.getElementById("windspeed");
var humidityEl = document.getElementById("humidity");
var uvIndexEl = document.getElementById("uv-index");
var temperatureEl = document.getElementById("temperature");
var iconEl = document.getElementById("icon-picture");

let weather = {
    apiKey: "337d80042405d94ae5667a58a7159148",
    fetchLocation: function (typedLocation) {
        fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q=" + typedLocation + "&appid=337d80042405d94ae5667a58a7159148"
        ).then(location => location.json()).then(location => { return location });
    },
    fetchWeather: function (lat, lon) {
        fetch(
            "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&units=imperial&appid=337d80042405d94ae5667a58a7159148"
        ).then((response) => response.json())
            .then((data) => (data));
    }
};

async function getWeatherFromCityName(typedLocation) {
    var locations = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + typedLocation + "&appid=337d80042405d94ae5667a58a7159148")
        .then(response => response.json());
    let location = locations[0];
    let weather = await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=" + location.lat + "&lon=" + location.lon + "&exclude=hourly,minutely&units=imperial&appid=337d80042405d94ae5667a58a7159148")
        .then(response => response.json());
    var temp = weather.current.temp;
    var cityName = typedLocation;
    var humidity = weather.current.humidity;
    var uvIndex = weather.current.uvi;
    var icon = weather.current.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
    var windspeed = weather.current.wind_speed;
    var description = weather.current.weather[0].description;
    temperatureEl.innerHTML = temp + "&#xb0 F";
    cityNameEl.innerHTML = cityName;
    humidityEl.innerHTML = "Humidiy: " + humidity + "%";
    windspeedEl.innerHTML = "Windspeed: " + windspeed + " mp/h"
    uvIndexEl.innerHTML = "UV Index: " + uvIndex;
    weatherDescriptionEl.innerHTML = description;
    iconEl.src = iconUrl;
    fiveDayDateInfo(weather.daily)
    loadSearches();
};


async function clickPreviousSearch(clickedSearch) {
    var locations = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + clickedSearch.target.innerHTML + "&appid=337d80042405d94ae5667a58a7159148")
        .then(response => response.json());
    let location = locations[0];
    let weather = await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=" + location.lat + "&lon=" + location.lon + "&exclude=hourly,minutely&units=imperial&appid=337d80042405d94ae5667a58a7159148")
        .then(response => response.json());
    var temp = weather.current.temp;
    var cityName = clickedSearch.target.innerHTML;
    var humidity = weather.current.humidity;
    var uvIndex = weather.current.uvi;
    var icon = weather.current.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
    var windspeed = weather.current.wind_speed;
    var description = weather.current.weather[0].description;
    temperatureEl.innerHTML = temp + "&#xb0 F";
    cityNameEl.innerHTML = cityName;
    humidityEl.innerHTML = "Humidiy: " + humidity + "%";
    windspeedEl.innerHTML = "Windspeed: " + windspeed + " mp/h"
    uvIndexEl.innerHTML = "UV Index: " + uvIndex;
    weatherDescriptionEl.innerHTML = description;
    iconEl.src = iconUrl;
    fiveDayDateInfo(weather.daily)
};





function loadSearches() {
    var ul = document.getElementById("previous-searches");
    ul.innerHTML = ""
    savedCities.forEach(city => {
        var li = document.createElement("li");
        var text = document.createTextNode(city)
        li.appendChild(text);
        ul.appendChild(li);
        li.addEventListener("click", clickPreviousSearch)
    });
}



function fiveDayDateInfo(dailyInfo) {
    var number = 0;
    var htmlDays = document.querySelectorAll("[data-day]")
    dailyInfo.forEach(day => {
        var htmlDay = htmlDays[number++];
        if (htmlDay != undefined) {
            var dayName = htmlDay.querySelector(".day-name");
            var dayWind = htmlDay.querySelector(".day-windspeed");
            var dayUvIndex = htmlDay.querySelector(".day-uv-index");
            var dayTemp = htmlDay.querySelector(".day-temp");
            var dayHumidity = htmlDay.querySelector(".day-humidity");
            var dayIcon = htmlDay.querySelector(".icon-picture");
            var icon = day.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            dayName.innerHTML = new Date(day.dt * 1000).toLocaleDateString('en-us', { weekday: "long" });
            dayWind.innerHTML = "Wind Speed: " + day.wind_speed + " mp/h";
            dayUvIndex.innerHTML = "UV Index: " + day.uvi;
            dayHumidity.innerHTML = "Humidity: " + day.humidity + "%";
            dayTemp.innerHTML = day.temp.day + "&#xb0 F";
            dayIcon.src = iconUrl;

        }
    });
}
