document.addEventListener('DOMContentLoaded', function() {
  const APIKey = "6012dcbe60d44108ae3172021230607";

  // Function to fetch weather data
  function fetchWeatherData(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Process the weather data
        displayWeatherData(data);
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
      });
  }

  function displayWeatherData(data) {
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');

    cityNameElement.textContent = data.location.name;
    temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C`;
    descriptionElement.textContent = `Description: ${data.current.condition.text}`;
    humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
  }

  // Add an event listener to the search button
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', function() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    fetchWeatherData(city);
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    fetchWeatherData(city);
  });
});  

