let apiKey = '060c7c61814c1dd7e9362ab95b9026ea';
let temperatureEl = document.querySelector('#temperature');
let cityElement = document.querySelector('#city');
let countryElement = document.querySelector('#country');
let tempDescription = document.querySelector('#description');
let humidityElement = document.querySelector('#humidity');
let windElement = document.querySelector('#wind')
let iconElement = document.querySelector('#icon');
let celsiusTemp = null;

//variables for form
let form = document.querySelector('.search-form');
form.addEventListener('submit', handleSubmit)

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

function search(city) {
    // let city = 'Manila';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector('#city-input');
    search(cityInputElement.value);    
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
}

//variables for unit conversion
let farenheitLink = document.querySelector('.farenheit');
farenheitLink.addEventListener('click', displayFarenheitTemp);

let celsiusLink = document.querySelector('.celsius');
celsiusLink.addEventListener('click', displayCelsiusTemp);

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
    console.log(apiUrl);
    axios.get(apiUrl).then(displayTemperature);
}
function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}



   