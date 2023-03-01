let apiKey = '060c7c61814c1dd7e9362ab95b9026ea';
let temperatureEl = document.querySelector('#temperature');
let cityElement = document.querySelector('#city');
let countryElement = document.querySelector('#country');
let tempDescription = document.querySelector('#description');
let humidityElement = document.querySelector('#humidity');
let windElement = document.querySelector('#wind')
let iconElement = document.querySelector('#icon');
let celsiusTemp = null;
let tempMin = document.querySelector('[data-min-temp]');
let tempMax = document.querySelector('[data-max-temp]');
let tempPressure = document.querySelector('[data-pressure-temp]');
let visibility = document.querySelector('[data-visibility')
let clouds = document.querySelector('[data-clouds]')

// variables for date
let dateElement = document.querySelector('#date');
    
// function for Dates
function formatDate(timestamp) {
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours < 10) {
        hours = `0${hours}`;
     }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    return days[day];
}

//Calling the API
function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
}

//Search function
let form = document.querySelector('.search-form');
form.addEventListener('submit', handleSubmit)
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector('#city-input');
    search(cityInputElement.value);    
}


function displayForecast(response) {
    let dailyForecast = response.data.daily;
    let dailySection = document.querySelector('[data-day-section]');
    let dailyForecastHTML = `<div class="row row-cols-7 mt-2 mb-5 g-3 g-lg-3 daily-data">`

    dailyForecast.forEach(function (forecastDay, index) {
        if (index <= 6) {
            dailyForecastHTML +=
            `<div class="col">
                <div class="glass-effect card-effect card border-0 text-altlight">
                            <div class="card-body text-center">
                                <h5 class="card-title day">${formatDay(forecastDay.dt)}</h5>
                                <img
                                    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="50" class="img-fluid"/>
                                <div class="row d-flex pt-2 justify-content-between">
                                    <div class="col">
                                        <span class="max-temp">${Math.round(forecastDay.temp.max)}${`&deg`}</span>
                                    </div>
                                    <div class="col">
                                        <span class="min-temp">${Math.round(forecastDay.temp.min)}${`&deg`}</span>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>`    
        }
    });

    dailyForecastHTML = dailyForecastHTML + `</div>`;
    dailySection.innerHTML = dailyForecastHTML;    
}

function getForecast(coordinates) {
    let apiKey = '49b631c45785fe73d2a88477803dea22';
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`

    axios.get(apiUrl).then(displayForecast)
}

function displayTemperature(response) {
    celsiusTemp = response.data.main.temp;
    temperatureEl.innerHTML = Math.round(celsiusTemp);
    cityElement.innerHTML = response.data.name;
    countryElement.innerHTML = response.data.sys.country;
    tempDescription.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed;
    dateElement.innerHTML = formatDate(response.data.dt * 1000); 
    iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`);
    iconElement.setAttribute('alt', response.data.weather[0].description);    
    tempMin.innerHTML = `${response.data.main.temp_min}&deg`;
    tempMax.innerHTML = `${response.data.main.temp_max}&deg`;
    tempPressure.innerHTML = response.data.main.pressure;
    visibility.innerHTML = response.data.visibility;
    clouds.innerHTML = response.data.clouds.all
    getForecast(response.data.coord);    
}

//variables for unit conversion
let farenheitLink = document.querySelector('.farenheit');
farenheitLink.addEventListener('click', displayFarenheitTemp);

let celsiusLink = document.querySelector('.celsius');
celsiusLink.addEventListener('click', displayCelsiusTemp);

//function for unit conversion
function displayCelsiusTemp(event) {
    event.preventDefault();
    farenheitLink.classList.remove('active')
    celsiusLink.classList.add('active');
    temperatureEl.innerHTML = Math.round(celsiusTemp);
}

function displayFarenheitTemp(event) {
    event.preventDefault();
    let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
    //remove the celsius active link
    celsiusLink.classList.remove('active');
    farenheitLink.classList.add('active')
    temperatureEl.innerHTML = Math.round(farenheitTemp);
}

// for geolocation
let currentLocation = document.querySelector('.current-location');
currentLocation.addEventListener('click', getCurrentPosition);

function showPosition(position) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
    axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}



   