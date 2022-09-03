const mongoose = require("mongoose")

const cauhoiSchema = new mongoose.Schema({
    stt:{
        type: Number,
    },
    mondai:{
        type: String,
    },
    noidung:{
        type: Array,
        default: []
    },
    img:{
        type: String,
        require: false,
    },
    dapan:{
        type: Array,
        default: []
    },
    dethiId:{
        type:Array,
        default: [],
    },
    dethiIdRoot:{
        type: String,
        require: false
    },
    nguoilamsai:{
        type:Array,
        default: [],
    }
})

module.exports = mongoose.model("Cauhoi", cauhoiSchema)