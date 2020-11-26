const key = 'YZx7Hdo2xgzwAPLPDma0h06kEqp0lBwS';

//get city information

const getCity = async (city)=> {
const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const query = `?apikey=${key}&q=${city}`;
const request = await fetch(base + query);
const data = await request.json();
return data[0];
};

//get weather information

const getWeather = async(Key)=> {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${Key}?apikey=${key}`;
    
    const request = await fetch(base + query);
    const data = await request.json();
    return data[0];
    };
    

// getCity('iasi').then(data=>{
//     return getWeather(data.Key);
// }).then (data=> {
// console.log(data);
// }).catch(err=>{
// console.log(err);
// });






