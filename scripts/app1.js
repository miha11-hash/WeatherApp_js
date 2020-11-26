const form = document.querySelector('form');
const placeh = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const details = document.querySelector('.details');
const card = document.querySelector('.card');


//update UI

const updateUI = (data)=> {

    const {cityUpdate, weatherUpdate} = data
    console.log(data);

    details.innerHTML = `<h5 class="my-3">${data.cityUpdate.EnglishName}</h5>
    <div class="my-3">${data.weatherUpdate.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${data.weatherUpdate.Temperature.Metric.Value}</span>
        <span>&deg;C</span>`;


    const iconSrc = `img/icons/${weatherUpdate.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc); 


    if(card.classList.contains('d-none')){
      card.classList.remove('d-none');  
    };

    // const placehResult = weatherUpdate.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    // placeh.setAttribute('src', placehResult);

    let placehSrc = null;
    if (weatherUpdate.IsDayTime){
        placehSrc = 'img/day.svg';
    } else {
        placehSrc = 'img/night.svg';
    };

    placeh.setAttribute('src', placehSrc);
    scrollTo(999,999);
};

//update the city-weather
const updateCityWeather = async(city)=>{
const cityUpdate = await getCity(city);
const weatherUpdate = await getWeather (cityUpdate.Key);
return {cityUpdate, weatherUpdate};
};



form.addEventListener('submit', e=> {
e.preventDefault();
const city = form.city.value.trim();

console.log(city);

updateCityWeather(city).then(data=> {
updateUI(data);
}).catch(err=> {
console.log(err);
});

//set local storage
localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    updateUI(localStorage.getItem('city'))
.then(data=> updateUI(data))
.catch(err=> {
    console.log(err);
});
};

