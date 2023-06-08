const mongoose = require("mongoose");

const { userModel, seatModel } = require("../Models/User");


const getAllSeatNumbers = async()=>{
    const arrayOfSeats = seatModel.find().select({
        seatNo: 1
    })

    console.log(arrayOfSeats);
    return arrayOfSeats;

}



module.exports ={
    getAllSeatNumbers
}