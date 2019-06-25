var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_campdb", { useNewUrlParser: true });

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs") //used to remmove .ejs in render

app.get('/', function(req, res) {
  //res.send("This will be the landing page soon");
  res.render("landing");
});

app.listen(3000, '127.0.0.1', function() {
  console.log("Yeah Yelpcamp server has started!");
});
// var campgrounds = [
//   {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
//   {name: "granite hill", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},
//   {name: "SGNP", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
//
// ];
// Campground.create(
//   {
//     name: "Salmon Creek",
//     image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
//     description: "coolest place ever"
//   },function(err, newlycreatedcamps){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(newlycreatedcamps);
//   }
// });

app.get("/campgrounds", function(req, res){
  Campground.find({},function(err,allcamps){
    if(err){
      console.log(err);
    } else {
      //console.log(allcamps);
      res.render("campgrounds", {campgrounds:allcamps});
    }
  });
  //res.render("campgrounds", {campgrounds:allcamps});  //name:data we are passing
});

app.post('/campgrounds',function(req, res) {  //note that this is post req, it is ok to use same name
  //get data from form and add to canpground array
  //res.send("You hit the POST ROUTE")
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  console.log(name);
  console.log(image);
  console.log(desc);
  var newCampground = {name: name, image: image, description: desc};
  console.log(newCampground);
  Campground.create(newCampground,function(err, newlycreatedcamps){
    if(err){
      console.log(err);
    } else {
      //console.log(newlycreatedcamps);
      res.redirect("/campgrounds");
    }
  });

  //campgrounds.push(newCampground)
  //redirect back to campground page

});

app.get('/campgrounds/new', function(req,res){
  res.render("new.ejs")
});

app.get('/campgrounds/:id',function(req,res){
  Campground.findById(req.params.id, function(err, foundCamp){
    if(err){
      console.log(err);
    } else {
      res.render("show",{campground: foundCamp});
    }
  });

});
