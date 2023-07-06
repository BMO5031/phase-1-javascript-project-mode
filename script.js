document.addEventListener('DOMContentLoaded', function() {
  const APIKey = "6012dcbe60d44108ae3172021230607";

  // Function to fetch weather data
  function fetchWeatherData(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          displayErrorMessage(data.error.message);
        } else {
          displayWeatherData(data);
          clearErrorMessage();
        }  
        // Process the weather data
        displayWeatherData(data);
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
        displayErrorMessage('could not retrieve weather data. Please try again later.');
      });
    }

  function displayWeatherData(data) {
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');
    const weatherIconElement = document.getElementById('weather-icon');

    cityNameElement.textContent = data.location.name;
    temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C`;
    descriptionElement.textContent = `Description: ${data.current.condition.text}`;
    humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeedElement.textContent = `WindSpeed: ${data.current.windspeed}km/h`;

  }

  function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
  }
   function clearErrorMessage() {
    const errorMessageElement =document.getElementById('error-message');
    errorMessageElement.textContent = '';
   }

  // Add an event listener to the search button
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', function() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    if (city) {
      fetchWeatherData(city);
    } else {
      displayErrorMessage('Enter a valid City name.');
    }
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();

    if(city) {
      fetchWeatherData(city);
    } else {
      displayErrorMessage('Enter a valid City name.');
    }
  });
});  

