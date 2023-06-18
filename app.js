let now = new Date();
let h2 = document.querySelector("h2");

let days =
["Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"];


let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();
let months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"september",
"October",
"November",
"December"
];
let month = months[now.getMonth()];
h2.innerHTML = `${day} <br> ${month} ${date}, ${year}`;

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day]; 
}

function displayForecast(response) {
    let forecast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;

    forecast.forEach(function(forecastDay, index) {
    if (index < 6)

    {forecastHTML = 
       forecastHTML + 
        `
        <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
          alt=""
          width="42" />
        <div class="weather-forecast-temepratures">
        <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div> 
        </div>
        `;}
       })
       forecastHTML = forecastHTML + `</div>`;
    
    forecastElement.innerHTML = forecastHTML;
    
}

function getForecast(coordinates) {
    console.log(coordinates);   
    let key = "d1a86552de255334f6117b348c4519bd";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=imperial`;
axios.get(apiUrl).then(displayForecast);
}


function currentWeather(response) {
farhrenheitTemperature = response.data.main.temp;
let h1 = document.querySelector("#temp");
h1.innerHTML = `${Math.round(farhrenheitTemperature)}˚`;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
getForecast(response.data.coord);
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let descriptionElement = document.querySelector("#description");

humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  descriptionElement.innerHTML = response.data.weather[0].description;
}


let farhrenheitTemperature = null;

function searchCity(city){
    let key = "d1a86552de255334f6117b348c4519bd";
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
    
    axios.get(url).then(currentWeather);

    }


function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    
    searchCity(searchInput.value);
    }
    
    let form = document.querySelector("#search-form");
    
    form.addEventListener("submit", search)