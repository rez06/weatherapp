let apiKey = '060c7c61814c1dd7e9362ab95b9026ea';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${apiKey}`;
let temperatureEl = document.querySelector('#temperature');
let cityElement = document.querySelector('#city');
let countryElement = document.querySelector('#country');
let tempDescription = document.querySelector('#description');
let humidityElement = document.querySelector('#humidity');
let windElement = document.querySelector('#wind')
let iconElement = document.querySelector('#icon');

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


function displayTemperature(response) {
    temperatureEl.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    countryElement.innerHTML = response.data.sys.country;
    tempDescription.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed;
    dateElement.innerHTML = formatDate(response.data.dt * 1000); 
    iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`);
    iconElement.setAttribute('alt', response.data.weather[0].description);
}

axios.get(apiUrl).then(displayTemperature)