const mongoose = require("mongoose")

const CapdothiSchema = new mongoose.Schema({
    capdo:{
        type: String,
        required: true,
    },
    madethi:{
        type: Array,
        default: [],
    }
})

module.exports = mongoose.model("Capdothi",CapdothiSchema)