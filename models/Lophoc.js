const mongoose = require("mongoose")

const LophocSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type: String,
    },
    isAdminCreated:{
        type: Boolean,
        default: false,
    },
    idHocsinh:{
        type: Array,
        default:[],
    },
    userId:{
        type:String,
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("Lophoc", LophocSchema)