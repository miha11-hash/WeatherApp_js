const form = document.querySelector('form');
const card = document.querySelector('.card');
const placeh = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const details = document.querySelector('.details');


// //get city & weather updates
const cityweatherUpdate = async (city)=> {
const cityUpdate = await getCity(city);
const weatherUpdate = await getWeather(cityUpdate.Key);
return {cityUpdate, weatherUpdate};
};

// update the UI

const updateUI = (data)=> {

const {cityUpdate, weatherUpdate} = data;

details.innerHTML = `<h5 class="my-3">${cityUpdate.EnglishName}</h5>
<div class="my-3">${weatherUpdate.WeatherText}</div>
<div class="display-4 my-4">
    <span>${weatherUpdate.Temperature.Metric.Value}</span>
    <span>&deg;C</span>`;

let placehSrc = null;
if(weatherUpdate.IsDayTime){
placehSrc = 'img/day.svg';
} else {
placehSrc = 'img/night.svg';
};
placeh.setAttribute('src', placehSrc);


const iconSrc = `img/icons/${weatherUpdate.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc);


if (card.classList.contains('d-none')){
card.classList.remove('d-none');
};
};


form.addEventListener('submit', e=> {
e.preventDefault();
const city = form.city.value.trim();
console.log(city);
cityweatherUpdate(city).then(data=> {
updateUI(data);
console.log(window.scrollY);
}).catch(err=> {
console.log(err);
});

});