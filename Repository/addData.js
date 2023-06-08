const { userModel, seatModel } = require("../Models/User");


const addIntoSeatModel = async(seatNumbers, id)=>{
    const allModels = [];

    seatNumbers.forEach(seat => {
        const data = new seatModel({
            seatNo: seat,
            userId: id
        })
        allModels.push(data);
    });

    const addIntoSeat = await seatModel.insertMany(allModels)

    return "added into seats"
   

}

const addIntoUser = async(userName, seats, timestamp)=>{
    const data = {
        name: userName,
        seats: seats,
        timestamp: timestamp
    }
    const dataModel = new userModel(data);

    const addIntoDB = await userModel.insertMany([dataModel])
    const id = addIntoDB[0]["_id"]
    addIntoSeatModel(seats, id)
    return "added"
}



module.exports = {
    addIntoUser
}