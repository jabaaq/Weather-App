'use strict'
const search = document.querySelector('#search-bar')
const searchBtn = document.querySelector('.searchBtn')
const weatherImg = document.querySelector('.weather-img')
const temperature = document.querySelector('.weather-temp')
const weatherText = document.querySelector('.weather-text')
const humidity = document.querySelector('.abt-humidity')
const windSpeed = document.querySelector('.abt-wind-speed')
const invalidLocation = document.querySelector('.location-name')
const loading = document.getElementById('loading');

searchBtn.addEventListener('click', () => {

    loading.style.display = 'block';

    const apiKey = 'bae3d825ee91b672bb84c1dfb4bc0e09'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${apiKey}`



    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod === '404' || data.cod === '400') {
                weatherImg.src = 'img/Error.png'
                invalidLocation.textContent = "Oops! Invalid location! :/"
                temperature.textContent = ''
                humidity.textContent = ''
                windSpeed.textContent = ''
                weatherText.textContent = ''
                loading.style.display = 'none';

                return
            } else {
                let weatherName = data.weather[0].main
                let tempInKelvin = data.main['temp']
                let tempInCelsius = parseInt(tempInKelvin - 273.15)
                invalidLocation.textContent = ''
                temperature.textContent = `${tempInCelsius}°`
                humidity.textContent = `${data.main.humidity}%`
                windSpeed.textContent = `${parseInt(data.wind.speed * 3.6)}km/h`
                weatherText.textContent = weatherName
                search.value = ''
                loading.style.display = 'none';

                switch (weatherName) {
                    case 'Clouds':
                        weatherImg.src = 'img/Cloudy.webp'
                        break
                    case 'Snow':
                        weatherImg.src = 'img/Snow.png'
                        break
                    case 'Rain':
                        weatherImg.src = 'img/rain.webp'
                        break
                    case 'Haze':
                        weatherImg.src = 'img/haze.png'
                        break
                    case 'Clear':
                        weatherImg.src = 'img/clear.png'
                        break
                }
                return
            }
        })
        .catch(e => {
            console.log('API Error:', e);
            loading.style.display = 'block';
        })
})



