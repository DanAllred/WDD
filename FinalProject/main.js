import {
    inputCheck,
    windDirection
} from './functions.js';

// global variables
let latitude, longitude, zip, cityname;

// URLs for api calls
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const weatherAPI = `,us&units=imperial&APPID=390e2c7ae7f11da066639b14a77939e5`;

const tfforecastURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const tfforecastAPI = '&us&units=imperial&cnt=8&appid=390e2c7ae7f11da066639b14a77939e5';

const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const forecastAPI = '&exclude=hourly&us&units=imperial&appid=390e2c7ae7f11da066639b14a77939e5';
// other api's called in fetch because they required the gps coordinates returned by the zip entry

// DOM - buttons
const apiWeather = document.getElementById('weather');
const apitdForecast = document.getElementById('tdforecast');
const apiForecast = document.getElementById('forecast');

// DOM - output
const outputDiv = document.getElementById('output');
const forecastOutput = document.getElementById('forecastOutput');
document.getElementById('icon').style.display = 'none';
forecastOutput.style.display = 'none';

// DOM - input
let zipInput = document.getElementById('zipCode');

// (onchange event)information loaded with weather icon and current temp when zip changes
window.addEventListener('change', () => {
    inputChange()
}, false);

// (onclick event) listener for weather call
apiWeather.addEventListener('click', () => {
    weather()
}, false);

// (onclick event) listener for 3 day
apitdForecast.addEventListener('click', () => {
    tfforecast()
}, false);

// (onclick event) listener for 5 day 
apiForecast.addEventListener('click', () => {
    forecast()
}, false);

// (oninput event) checks zip code for numeric and undefined values then gives feedback
zipInput.addEventListener('input', () => {
    inputCheck()
}, false);



function weather() {
    zip = parseInt(document.getElementById('zipCode').value);
    forecastOutput.style.display = 'none';
    fetch(weatherURL + zip + weatherAPI)
        .then(response => {
            outputDiv.innerHTML = 'Waiting for response...verify valid zip code entered';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then((data) => {
            let output = `<h2 class="mb-4">Weather Conditions for <b>${data.name}</b> </h2>`;
            outputDiv.innerHTML = output +=
                `<ul>
            <li>Weather Description <b>${ data.weather[0].description} </b></li>
            <li>Currently <b>${data.main.temp }°F</b> and feels like <b> ${data.main.feels_like}°F </b></li>
            <li>Barometric pressure of <b>${ data.main.pressure}</b></li>
            <li>Humidity at <b> ${ data.main.humidity }% </b></li>
            <li>Current visibility <b>${ data.visibility}</b></li>
            <li>Wind speed <b> ${ data.wind.speed} MPH</b></li>
            <li>Wind Direction<b> ${windDirection(data.wind.deg)}</b></li>
            </ul>
            `
        })
        .catch(error => console.log('There was an error:', error))
}


//24 hour forecast
function tfforecast() {
    zip = parseInt(document.getElementById('zipCode').value);
    forecastOutput.innerHTML = '';
    forecastOutput.style.display = 'flex';
    fetch(tfforecastURL + zip + tfforecastAPI)
        .then(response => {
            outputDiv.innerHTML = 'Waiting for response...verify valid zip code entered';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            let output = `<h2 class="mb-4">Forecast for  ${data.city.name}</h2>`;
            outputDiv.innerHTML = output += `
            <ul>
            <li>Sunrise: ${new Date(data.city.sunrise*1000).toLocaleString()}</li>  
            <li>Sunset: ${new Date(data.city.sunset*1000).toLocaleString()}</li>
            </ul>
        `;
            // loop through the array 
            for (let i = 0; i < data.list.length; i++) {
                forecastOutput.innerHTML += `
            <div class='forecast'>
            <ul>
            <li><b>${new Date(data.list[i].dt*1000).toLocaleString()}</b></li><br>
            <li>Projected temp: <b>${data.list[i].main.temp}°F</b></li>
            <li>Min Temp: <b>${data.list[i].main.temp_min}°F</b></li>
            <li>Max Temp: <b>${data.list[i].main.temp_max}°F</b></li>
            <li>Feels Like: <b>${data.list[i].main.feels_like}°F</b></li>
            <li>Description: <b>${data.list[i].weather[0].description} </b></li>
            <li>Wind: <b>${data.list[i].wind.speed}mph ${windDirection(data.list[0].wind.deg)}</b></li>
            </ul>
            <hr>
            </div>
            `;
            }
        })
        .catch(error => console.log('There was an error:', error))
}



function forecast() {
    zip = parseInt(document.getElementById('zipCode').value);
    forecastOutput.innerHTML = '';
    forecastOutput.style.display = 'flex';
    fetch(forecastURL + zip + forecastAPI)
        .then(response => {
            outputDiv.innerHTML = 'Waiting for response...verify valid zip code entered';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            let output = `<h2 class="mb-4">Forecast for  ${data.city.name}</h2>`;
            outputDiv.innerHTML = output += `
            <ul>
            <li>Sunrise: ${new Date(data.city.sunrise*1000).toLocaleString()}</li>  
            <li>Sunset: ${new Date(data.city.sunset*1000).toLocaleString()}</li>
            </ul>
        `;
            // loop through the array 
            for (let i = 0; i < data.list.length; i+=8) {
                forecastOutput.innerHTML += `
            <div class='forecast'>
            <ul>
            <li><b>${new Date(data.list[i].dt*1000).toLocaleString()}</b></li><br>
            <li>Projected temp: <b>${data.list[i].main.temp}°F</b></li>
            <li>Min Temp: <b>${data.list[i].main.temp_min}°F</b></li>
            <li>Max Temp: <b>${data.list[i].main.temp_max}°F</b></li>
            <li>Feels Like: <b>${data.list[i].main.feels_like}°F</b></li>
            <li>Description: <b>${data.list[i].weather[0].description} </b></li>
            <li>Wind: <b>${data.list[i].wind.speed}mph ${windDirection(data.list[0].wind.deg)}</b></li>
            </ul>
            <hr>
            </div>
            `;
            }
        })
        .catch(error => console.log('There was an error:', error))
}
