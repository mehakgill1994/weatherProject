const express = require('express')
const https = require('https')
require('dotenv').config()

app = express()
app.use(express.urlencoded({extended: true}))


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {
    const place = req.body.cityName
    const key = process.env.OPEN_WEATHER_MAP_API_KEY
    const units = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid='+ key + '&units=' + units

    https.get(url, (api_res) => {
        console.log(api_res.statusCode)
        api_res.on('data', (data)=>{
            const weather_data = JSON.parse(data)
            var icon = weather_data.weather[0].icon
            const image_url = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
            res.write('<div><img src=' + image_url + ' ></div>')
            res.write('<h2>The temperature in ' + place + ' is ' + weather_data.main.temp + ' degree celcius</h2>')
            res.write('<h2>The weather in ' + place + ' is ' + weather_data.weather[0].description + '</h2>')
            res.send()
        })
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})