const mongoose = require("mongoose")

const MaziiSchema = new mongoose.Schema({
    isActive:{
        type: Boolean,
        default: true,
    },
    tuvung:{
        type: String,
        require: false,
    },
    cachDoc:{
        type: Array,
        default: []
    },
    hanViet:{
        type:String,
        require: false,
    },
    explains:{
        type: Array,
        default: []
    },
    note:{
        type: String,
        require: false,
    },
    capdo:{
        type: Array,
    },
    giaotrinh: {
        type: Array,
    },
    stt:{
        type:Number,
    },
    userId :{
        type: String,
    },
    mazzi:{
        type:Array,
        default:[]
    }
},
{timestamps: true}
)

module.exports = mongoose.model("mazzi", MaziiSchema)