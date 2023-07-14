let now = new Date();

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let p = document.querySelector("p");

p.innerHTML = `${currentDay}, ${currentHour}:${currentMinute}`;

// Challenge 2

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#query");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "2e45eaecbf0d17607244af8d840a698f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data);
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#weather");
  temperatureElement.innerHTML = `${currentTemperature}°C`;
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#breeze");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

//Bonus Challenge

function cityPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2e45eaecbf0d17607244af8d840a698f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityInfo);
}

function displayCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(cityPosition);
}

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", displayCurrentCity);
