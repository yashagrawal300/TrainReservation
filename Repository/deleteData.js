const { userModel, seatModel } = require("../Models/User");


const removeFullData = async()=>{
    const deleteUserModel = await userModel.deleteMany({});
    const deleteSeatModel = await seatModel.deleteMany({});


    return true;

}

module.exports = {
    removeFullData
}