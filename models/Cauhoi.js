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
    // trường dùng tạm thời cho web test hằng ngày
    dethiIdRoot:{
        type: String,
        require: false
    },
    // trường dùng chính thức
    IdDethiRoot:{
        type: String,
        require: false
    },
    nguoilamsai:{
        type:Array,
        default: [],
    }
})

module.exports = mongoose.model("Cauhoi", cauhoiSchema)