const mongoose = require("mongoose")

const Mimin2Schema = new mongoose.Schema({
    stt:{
        type: Number,
        require: false,
    },
    tuvung:{
        type: String,
        require: false,
    },
    cachdoc:{
        type:String,
        require: false,
    },
    nghia:{
        type: String,
        default: false,
    },
    capdo:{
        type: String,
        require: false,
    },
    giaotring:{
        type: String,
        require: false,
    },
},
{timestamps: true}
)

module.exports = mongoose.model("Mimin2", Mimin2Schema)