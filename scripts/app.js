const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const img = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data)=> {

console.log(data);

// const cityDets = data.cityDets;
// const weather = data.weather;
// console.log(cityDets);
// console.log(weather);

//destructure properties

const {cityDets, weather} = data; 


details.innerHTML = `
<h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>`;

    //update the night/day & icon images

const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);


    //const timeSrc = weather.IsDayTime ? 'img/day.svg': 'img/night.svg';
    let timeSrc = null;
    if(weather.IsDayTime){
    timeSrc = 'img/day.svg';
    } else {
    timeSrc = 'img/night.svg';
    };
    img.setAttribute('src', timeSrc);


    //remove class d-none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };
};


const updateCity = async(cityInput)=> {
 const cityDets = await getCity(cityInput);
 const weather = await getWeather(cityDets.Key);
return {
cityDets: cityDets,
weather: weather
};
};


cityForm.addEventListener('submit', e=> {
e.preventDefault();
// get city value
const cityInput = cityForm.city.value.trim();
cityForm.reset();
console.log(cityInput);


//update the ul with new city
updateCity(cityInput).then(data=> {
    updateUI(data);
}).catch(err=> {
    console.log(err);
});

//scrollTo({top:999});

});


