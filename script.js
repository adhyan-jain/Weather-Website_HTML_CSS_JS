const apiKey = '579bcaad0eb09362967a4d100e565c26';

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return alert("Please enter a city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

async function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Location weather unavailable");
                
                const data = await response.json();
                updateWeatherUI(data);
            } catch (error) {
                alert(error.message);
            }
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
}

function updateWeatherUI(data) {
    document.getElementById("weatherData").classList.remove("hidden");
    document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerText = `🌡 Temperature: ${data.main.temp}°C`;
    document.getElementById("condition").innerText = `🌥 Condition: ${data.weather[0].description}`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").innerText = `💨 Wind Speed: ${data.wind.speed} m/s`;
}