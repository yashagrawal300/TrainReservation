const mongoose = require("mongoose");

const seatSchema =  new mongoose.Schema({
    seatNo: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    seats: []
})




const userModel = new mongoose.model("userSchema", userSchema);

const seatModel = new mongoose.model("seatSchema", seatSchema);



module.exports={
    userModel,
    seatModel
}
