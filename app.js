const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const path = require("path");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const deliverablesItems = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

const day = date.getDate();
    
    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){
    let item = req.body.newItem;

    if (req.body.list === "Deliverables"){
        deliverablesItems.push(item);
        res.redirect("/deliverables");
    }else{
        items.push(item);
        res.redirect("/");
    }
   
})

app.get("/deliverables", function(req, res){
    res.render("list", {listTitle: "Deliverables list", newListItems: deliverablesItems});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
});
