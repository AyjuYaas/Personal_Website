const searchbar = document.querySelector(".searchbox input");
const search = document.querySelector(".searchbox button"); 

searchbar
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        search.click();
    }
});

search.addEventListener('click', function(){
    const apikey = '4bd5ebca15c542f708281dc96affd520';
    const city = searchbar.value;
    if(city === '') return ;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then(response => response.json())
    .then(json => {
        const description = document.querySelector(".weather-box .description");
        const temperature = document.querySelector(".weather-box .temperature");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        if(json.cod === '404'){
            temperature.textContent = "N/A";
            description.innerHTML = `<span style="color: red">City Not Found!</span>`;
            humidity.textContent = "N/A";
            wind.textContent = "N/A";
        }

        temperature.innerHTML = `${(Math.floor(json.main.temp- 273.15))}<span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed} km/h`;
    })
})