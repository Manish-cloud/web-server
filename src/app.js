const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.send([
        {
            name: 'Manish',
            age: 21
        },
        {
            name : 'Shravan'
        }
    ])
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast:'Raining',
        location: 'Pune'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})