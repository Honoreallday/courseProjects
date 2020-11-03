//----------------------CLIENT SIDE JS ------------------------
const weatherForm = document.querySelector("form");

const address = document.querySelector('input');

const locationBox = document.querySelector('#location');
const forecastBox = document.querySelector('#forecast');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const addy = address.value; 

    locationBox.textContent = 'Loading...';
    let url = 'http://localhost:3000/weather';
    if (addy.length !== 0){
        url += "?addy=" + addy;
    }
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
          return  locationBox.textContent = data.error;
        } 

        locationBox.textContent = data.location;
        forecastBox.textContent = data.forcast.temp;

    })
})
})