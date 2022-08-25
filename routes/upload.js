const router = require("express").Router()
const multer = require("multer")
const User = require("../models/User")

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images/person");
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    },
})

const upload = multer({storage})

router.post("/", upload.single("file"), async (req,res)=>{
    try{
        return res.status(200).json("success")
    }catch(err){
        console.log("..."+err)
    }
})


module.exports = router