const mongoose = require("mongoose")

const GiaotrinhSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
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
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("giaotrinh", GiaotrinhSchema)