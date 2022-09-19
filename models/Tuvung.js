const mongoose = require("mongoose")

const TuvungSchema = new mongoose.Schema({
    isActive:{
        type: Boolean,
        default: true,
    },
    kanji:{
        type: String,
        require: false,
    },
    cachDoc:{
        type: String,
        require: false,
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
    wordDict:{
        type: String,
        require: false,
    },
    cachdoc : {
        type: String,
    },
    hanviet: {
        type: Array,
    },
    capdo:{
        type: Array,
    },
    giaotrinh: {
        type: Array,
    }
},
{timestamps: true}
)

module.exports = mongoose.model("tuvung_main", TuvungSchema)