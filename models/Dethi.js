const mongoose = require("mongoose")

const DethiSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    capdo:{
        type: String,
    },
    userId:{
        type: Array,
        default: [],
    },
    cauhoi:{
        type:Array,
        default:[]
    },
    userCreate:{
        type: String,
    },
    desc:{
        type: String,
    },
    ispublic:{
        type: Boolean,
        default: true
    },
    capdo:{
        type: String,
    },
    typedethi:{
        type:String,
    }
},
{timestamps: true}
)
module.exports = mongoose.model("Dethi", DethiSchema)