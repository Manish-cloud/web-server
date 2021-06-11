const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting static assets
app.use(express.static(path.join(__dirname, '..', '/public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manish Choudhary'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Manish Choudhary'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Manish Choudhary',
        helpText: 'This is some helpful text '
    })
})

app.get('/weather', (req, res) => {
    if(! req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    /*
    res.send({
        forecast:'Raining',
        location: 'Pune',
        address: req.query.address
    })
    */
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error })

            return res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(! req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Manish",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Manish",
        errorMessage: "Page not Found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})