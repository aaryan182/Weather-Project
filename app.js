const express = require("express");
const https =  require("https");
const bodyParser =  require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req,res) {

    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req,res) {
    const query = req.body.cityName;
    const apiKey = "1b9ea5f4b877934b23a188f0146aa609";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + unit ;
    https.get(url , function (response) {
        console.log(response.statusCode);

        response.on("data",function (data) { 
            // console.log(data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            // const imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            const imageUrl = "http://openweathermap.org/img/wn/02d@2x.png"
            console.log(temp);
            console.log(description);
            // We can have only one res.send so to print all things use res.write 
            res.write("<p>the weather is currently  "  + description + "</p>"  )
            res.write("<h1>the temperature in " + query + " is : " + temp + " degree celsius </h1>")
            res.write("<img src=" + imageUrl + ">")
            res.send();
        })

    })
  
})
 


app.listen(3000, function () { 
    console.log("Server port is running at 3000");
})