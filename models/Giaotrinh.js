const mongoose = require("mongoose")

const GiaotrinhSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    tuvung:{
        type: Array,
        default: []
    },
    explains:{
        type: String,
    },
    capdo:{
        type:String,
    },
    userId:{
        type:String,
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("giaotrinh2", GiaotrinhSchema)