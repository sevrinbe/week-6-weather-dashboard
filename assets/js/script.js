var typedLocation = document.getElementById("search-box");

let weather = {
    apiKey: "337d80042405d94ae5667a58a7159148",
    fetchLocation: function (typedLocation) {
        fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q=" + typedLocation + "&appid=337d80042405d94ae5667a58a7159148"
        ).then(location => location.json()).then(location => { return location });
    },
    fetchWeather: function (lat, lon) {
        fetch(
            "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&units=imperial&appid=337d80042405d94ae5667a58a7159148"
        ).then((response) => response.json())
            .then((data) => (data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather;
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
    }

};


async function getWeatherFromCityName(typedLocation) {
    var locations = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + typedLocation + "&appid=337d80042405d94ae5667a58a7159148")
        .then(response => response.json());
    let location = locations[0];
    let weather = await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=" + location.lat + "&lon=" + location.lon + "&exclude=hourly,daily&units=imperial&appid=337d80042405d94ae5667a58a7159148")
        .then(response => response.json());
    console.log(weather.current.temp);
}

