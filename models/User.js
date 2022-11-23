const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 25,
        unique: true,
    },
     email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
     },
     password: {
        type: String,
        require: true,
        min: 6,
        max: 50,
     },
     profilePicture: {
        type: Array,
        default: [],
     },
     covePicture: {
         type: Array,
         default: [],
     },
     danghoc: {
        type: Array,
        default: [],
     },
     tuvung: {
      type: Array,
      default: [],
   },
     caulamsai:{
      type: Array,
      default: []
     },
     isAdmin: {
        type: Boolean,
        default: false,
     },
     decs: {
        type: String,
        max: 70,
     },
},
{timestamps: true}

)

module.exports = mongoose.model("User",UserSchema)