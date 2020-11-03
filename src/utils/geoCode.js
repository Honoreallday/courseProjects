const http = require('request');

const geocode = (address, callback) => {
    //the encoded uri method just encodes special characters like '?' into their URl coutnerpart. Would work fine just to have "address" there, but this is a little safer
    const url =  "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaG9ub3JlYWxsZGF5IiwiYSI6ImNrZWtwZ3pjMjAxcGwzM281dHVhZGgzdGQifQ.OZ2o2HyaiX8jqQAm4drqRA&limit=1"
    http({url, json:true}, (error,{body}={}) => {
        if(error) {
            callback("unable to connect to location services!",undefined);
        } else if ( body.features.length === 0) {
            callback("unable to find location, try another place", undefined);
        } else {
            callback(undefined,{
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = {
    geocode: geocode
}