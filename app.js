var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs") //used to remmove .ejs in render

app.get('/', function(req, res) {
  //res.send("This will be the landing page soon");
  res.render("landing");
});

app.listen(3000, '127.0.0.1', function() {
  console.log("Yeah Yelpcamp server has started!");
});
var campgrounds = [
  {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  {name: "granite hill", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},
  {name: "SGNP", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
  {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  {name: "granite hill", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},
  {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  {name: "granite hill", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},
  {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  {name: "granite hill", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},
];
app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds:campgrounds});  //name:data we are passing
});

app.post('/campgrounds',function(req, res) {  //note that this is post req, it is ok to use same name
  //get data from form and add to canpground array
  //res.send("You hit the POST ROUTE")
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name, image: image}
  campgrounds.push(newCampground)
  //redirect back to campground page
  res.redirect("/campgrounds");
});

app.get('/campgrounds/new', function(req,res){
  res.render("new.ejs")
});
