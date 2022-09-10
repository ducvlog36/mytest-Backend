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
},
{timestamps: true}
)

module.exports = mongoose.model("Tuvung", TuvungSchema)