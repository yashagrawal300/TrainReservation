
const { userModel, seatModel } = require("../Models/User");


const getAllSeatNumbers = async()=>{
    const arrayOfSeats = await seatModel.find().select({
        seatNo: 1
    })
    const seats = [];
    arrayOfSeats.forEach(element => {
        seats.push(element.seatNo)
    });

    console.log(seats);
    return seats;

}

const getAllData = async()=>{
    const arrayOfSeats = await seatModel.find();
    return arrayOfSeats
}



module.exports ={
    getAllSeatNumbers,
    getAllData
}