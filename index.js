let searchBox = document.querySelector(".search-box");
let searchBtn = document.querySelector(".search-btn");
let weatherImg = document.querySelector(".weather-img");
let loc = document.querySelector(".loc");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".wind");
let cloud = document.querySelector(".cloud");
let humidity = document.querySelector(".humidity");

async function weather(city) {
  //  ------------ API KEY & URL --------------
  const apiKey = "ba8b25d9c6ab77cce431ba84087243a8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const weatherData = await fetch(apiUrl).then((response) => {
    return response.json();
  });

  // ---------- location not found run this code ----------
  if (weatherData.cod == "404") {
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".weather-dt-box").style.display = "none";
    loc.innerHTML = "";
    temp.innerHTML = "";
    weatherImg.src = "/images/404.png";
    return;
  }
  // ---------------------------------------------------------------

  loc.innerHTML = weatherData.name;
  temp.innerHTML = Math.round(weatherData.main.temp) + "°c";
  wind.innerHTML = Math.round(weatherData.wind.speed) + " km/h";
  cloud.innerHTML = weatherData.weather[0].main;
  humidity.innerHTML = weatherData.main.humidity + " %";

  if (weatherData.weather[0].main == "Rain") {
    weatherImg.src = "/images/rain.png";
  } else if (weatherData.weather[0].main == "Clouds") {
    weatherImg.src = "/images/clouds.png";
  } else if (weatherData.weather[0].main == "Clear") {
    weatherImg.src = "/images/clear.png";
  } else if (weatherData.weather[0].main == "Snow") {
    weatherImg.src = "/images/snow.png";
  } else if (weatherData.weather[0].main == "Drizzle") {
    weatherImg.src = "/images/drizzle.png";
  } else if (weatherData.weather[0].main == "Mist") {
    weatherImg.src = "/images/mist.png";
  } else if (weatherData.weather[0].main == "Haze") {
    weatherImg.src = "/images/haze.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".weather").classList.add("fadein");
  document.querySelector(".weather-dt-box").style.display = "block";
  document.querySelector(".weather-dt-box").classList.add("fadein");
}

searchBtn.addEventListener("click", () => {
  weather(searchBox.value.trim());
});
