const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
    res.send({
        forecast:'Raining',
        location: 'Pune'
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

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})