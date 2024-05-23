// script.js
const apiKey = 'fbe6aed0b6c2d56f4f3e2392bd956ee8';

document.getElementById('currentWeatherBtn').addEventListener('click', getCurrentWeather);
document.getElementById('forecastWeatherBtn').addEventListener('click', getWeatherForecast);

function getCurrentWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('weatherResult');
            const weather = data.weather[0];
            resultDiv.innerHTML = `
                <div class="weather-card">
                    <h2>Weather in ${data.name}</h2>
                    <img src="http://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${weather.description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

function getWeatherForecast() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=es&units=metric`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('weatherResult');
            resultDiv.innerHTML = '';
            const forecastList = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
            forecastList.forEach((day, index) => {
                const date = new Date(day.dt_txt).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
                const weather = day.weather[0];
                resultDiv.innerHTML += `
                    <div class="weather-card">
                        <h3>Day ${index + 1}</h3>
                        <img src="http://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">
                        <p>${date}</p>
                        <p>Night: ${day.main.temp_min} °C</p>
                        <p>Day: ${day.main.temp_max} °C</p>
                        <p>${weather.description}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}