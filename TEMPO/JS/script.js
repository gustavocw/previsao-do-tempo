//Vareáveis

const apiKey = "6c63cc30cc4a3c10dde9731dc7be6035";
const apiConuntryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")


const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")


//Functions

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}
    &units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}


const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = parseInt(data.main.temp)
    descElement.innerHTML = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiConuntryURL + data.sys.country)
    humidityElement.innerHTML = `${data.main.humidity}`
    windElement.innerHTML = `${data.wind.speed}Km/h`;

    weatherContainer.classList.remove("hide")
}


//Events

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city)



})

cityInput.addEventListener('keyup', (e) => {

    if(e.code === 'Enter') {
        const city = e.target.value

        showWeatherData(city);
    }
})