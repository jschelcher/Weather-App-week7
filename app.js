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

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days= ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function(day) {forecastHTML = 
        forecastHTML + 
        `
        <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
            <img src="http:openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="36" />
        <div class="weather-forecast-temepratures">
        <span class="weather-forecast-temperature-max">18◦</span>
        <span class="weather-forecast-temperature-min">12
        </div> 
        </div>
        `;
       })
       forecastHTML = forcastHTML + `</div>`;
    
    forecastElement.innerHTML = forecastHTML;}



function currentWeather(response) {
let farhrenheitTemperature = response.data.main.temp;
let h1 = document.querySelector("#temp");
h1.innerHTML = `${farhrenheitTemperature}˚`;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",'http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png');
}

function displayCelsiusTempreature(event) {
event.preventDefault();
let celsiusTemperature = ((farhrenheitTemperature-32)* 5)/9
let temperatureElement = document.querySelector("#temp")
temperatureElement.innerHTML = math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTempreature);

let farhrenheitTemperature = null;

function searchCity(city){
    let key = "d1a86552de255334f6117b348c4519bd";
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
    
    axios.get(url).then(currentWeather);rb
    
    }

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    
    searchCity(searchInput.value);
    }
    
    let form = document.querySelector("#search-form");
    
    form.addEventListener("submit", search)


displayforecast();