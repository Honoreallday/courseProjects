const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geo = require("./utils/geoCode.js");
const weath = require("./utils/forecast.js");

console.log(__dirname);
const port = process.env.PORT || 3000;

//define paths and express configuration
const pubDirPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const app = express();


//Setup handlebars and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//sets the static directory of the project
app.use(express.static(pubDirPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather Apps',
        Name:"Me NIGGA"
    })
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about Page',
        Name:"Emmanuel"
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'help Page',
        Name:"Emmanuel Honore"
    })
});

app.get('/weather', (req,res) => {
    if(!req.query.addy){
        return res.send({
            error:'you must provide an address in your query'
        })
    }


    geo.geocode(req.query.addy, (error, {lat, long, location:place} = {}) =>{
        if (error){
            res.send({
                Error: error
            })
        } else {
            weath.forecast(lat, long, (error, response) => {
                if(error){
                    return res.send({
                        Error: error
                    })
                }
                res.send(
                    {
                        forcast: {
                            temp: response.temp, 
                            feel: response.feel,
                            windS: response.windS,
                            windD: response.windD 
                                },
                        location: place,
                        initSearch: req.query.addy
                    }
                );
            })
        }
    })
});

app.get('/products', (req,res) => {
    if(!req.query.search){
        res.send({
            html:"<h2>you Need To Provide a search term</h2>",
            error: "search me hoe"
        })
    } else {
        console.log(req.query);
        res.send({
            products: []
        });
    }
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        errType: "this help article doesn't exist",
        Name:'Emmanuel',
        title: "Damn... Shit ain't looking too good"
    });
});

app.get('*', (req,res) => {
    res.render("404", {
        errType: "tbh I have no fucking Idea what you're looking for",
        Name:'Emmanuel',
        title: "Damn... Shit ain't looking too good"
    });
});

app.listen(port, () => {
    console.log('server is live baby at port' + port)
});   