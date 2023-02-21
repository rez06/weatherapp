let apiKey = '060c7c61814c1dd7e9362ab95b9026ea';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${apiKey}`;
let temperatureEl = document.querySelector('#temperature');
let cityElement = document.querySelector('#city');
let countryElement = document.querySelector('#country');
let tempDescription = document.querySelector('#description');
let humidityElement = document.querySelector('#humidity');
let windElement = document.querySelector('#wind')

function displayTemperature(response) {
    temperatureEl.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    countryElement.innerHTML = response.data.sys.country;
    console.log(response.data);
    tempDescription.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed
}

axios.get(apiUrl).then(displayTemperature)