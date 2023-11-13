const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    describe:{
        type:String,
        default:"Describe here!"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    done: {
        type: Boolean,
        required: true,
        default:false
    },
    finishedAt:{
        type:Date
    }
});

module.exports = mongoose.model("Todo_List", userSchema);