const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let deliverablesItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
      };

    let day = today.toLocaleDateString("en-US", options);
    
    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){
    let item = req.body.newItems;

    item.push(items);

    res.redirect("/");
})

app.get("/deliverables", function(req, res){
    res.render("deliverables", {listTitle: "Deliverables list", newListItems: deliverablesItems});
});

app.post("/deliverables", function(req, res){
    let item = req.body.newItems;

    item.push(items);

    res.redirect("/deliverables");
});



app.listen(3000, function(){
    console.log("Server running on port 3000");
});
