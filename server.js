const express = require("express"); //Serving frontend
const mongodb = require("mongoose"); //DataBase
var bodyparser = require("body-parser");
const {seatAllocation} = require('./Utils/seatAllocation');
const {getAllSeatNumbers} = require('./Repository/getData');
const {addIntoUser} = require('./Repository/addData');
const {removeFullData} =  require('./Repository/deleteData');
const path = require('path');
//MongoDB Connection
mongodb
	.connect(
		"mongodb+srv://yash_computer:forgetme111@cluster0.dxmvj.mongodb.net/trainReservation",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log(" WORKING"))
	.catch((error) => console.log("NOT WORKING ", +error));



var urlencodedParser = bodyparser.urlencoded({ extended: false });

const PORT = process.env.PORT || 8000; //Either the server port will or 8000
const dev = process.env.NODE_ENV !== "production";

const server = express();
server.use(bodyparser.json());
server.use(express.static(path.join(__dirname, 'build')));

server.delete("/deleteWholeData", function (req, res) {
    removeFullData();
    res.sendStatus(200)
});

server.get("/getFullData", function (req, res) {

});

server.post("/addData", urlencodedParser, function (req, res) {
    const name = req.body["Name"];
    const numberOfSeats = parseInt(req.body["Seats"]);
    const date = new Date();

    //get the data from DB --> All the seatId and pass it on the 
    //const seatNumbers = getAllSeatNumbers();
    const allocatedSeatNumber = seatAllocation(numberOfSeats);
    addIntoUser(name, allocatedSeatNumber, date)
    
    res.json({
        allocatedSeatNumber: allocatedSeatNumber
    })


});




server.get("*", function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

})


server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listenting on port" + PORT);
});