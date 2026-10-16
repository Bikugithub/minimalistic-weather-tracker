const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const tempDisplay = document.querySelector("#temp");
const cityDisplay = document.querySelector("#city");
const descDisplay = document.querySelector("#description");

// Paste your key here again
const apiKey = "81687b627c988a301871c265fb5b9efe"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        // 401 means the API key is wrong or still activating
        if (response.status === 401) {
            alert("API Key is not active yet! Please wait 15-30 minutes and try again.");
            return; 
        }
        
        // 404 means the spelling of the city is wrong
        if (response.status === 404) {
            alert("City not found! Please check your spelling.");
            return;
        }

        // If no errors, update the UI
        const data = await response.json();
        cityDisplay.textContent = data.name;
        tempDisplay.textContent = Math.round(data.main.temp) + "°C"; 
        descDisplay.textContent = data.weather[0].description;
        
    } catch (error) {
        alert("Network error. Please check your internet connection.");
    }
}

searchBtn.addEventListener("click", () => {
    if (cityInput.value !== "") {
        checkWeather(cityInput.value);
    }
});
