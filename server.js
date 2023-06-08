const express = require("express"); //Serving frontend
const mongodb = require("mongoose"); //DataBase
var bodyparser = require("body-parser");
const {seatAllocation, oneTimeRun, reset} = require('./Utils/seatAllocation');
const {getAllSeatNumbers, getAllData} = require('./Repository/getData');
const {addIntoUser} = require('./Repository/addData');
const {removeFullData} =  require('./Repository/deleteData');
const path = require('path');
//MongoDB Connection
mongodb
	.connect(
		"mongodb+srv://yash_computer:forgetme111@cluster0.dxmvj.mongodb.net/trainReservation",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {console.log(" WORKING") 
    oneTimeRun()
})
	.catch((error) => console.log("NOT WORKING ", +error));



var urlencodedParser = bodyparser.urlencoded({ extended: false });

const PORT = process.env.PORT || 8000; //Either the server port will or 8000
const dev = process.env.NODE_ENV !== "production";

const server = express();
server.use(bodyparser.json());
server.use(express.static(path.join(__dirname, 'build')));

server.delete("/deleteWholeData", function (req, res) {
    removeFullData();
    reset();
    res.sendStatus(200)
});

server.get("/getFullData", async function (req, res) {
    const data = await getAllData();
    console.log(data);
    res.json(data)


});

server.post("/addData", urlencodedParser, function (req, res) {
    const name = req.body["Name"];
    const numberOfSeats = parseInt(req.body["Seats"]);
    const date = new Date();

    //get the data from DB --> All the seatId and pass it on the 
    //const seatNumbers = getAllSeatNumbers();
    const allocatedSeatNumber = seatAllocation(numberOfSeats);
    if(allocatedSeatNumber.length > 0){
        addIntoUser(name, allocatedSeatNumber, date)
        res.json({
            allocatedSeatNumber: allocatedSeatNumber
        })
    
    }
    else{
        res.json({
            allocatedSeatNumber: ["Not allowed"]
        })
    
    }
    
    

});




server.get("*", function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

})


server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listenting on port" + PORT);
});