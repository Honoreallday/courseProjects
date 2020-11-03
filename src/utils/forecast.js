const http = require('request');


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?query=' + encodeURIComponent(lat) + "," + encodeURIComponent(long) + '&access_key=bd6f0830375d164f741cd65efe1e5bba&units=f';
    http({url:url, json: true}, (error, {body}={}) => {
        if(error){
           callback("cannot connect to service, pls check wifia and try again")
        } else if (body.error) {
            callback("Cannot find Provided location")
        } else {
           callback(undefined,{
               temp: body.current.temperature,
               feel: body.current.feelslike
           })
        }
    })
}

module.exports = {
    forecast: forecast
}