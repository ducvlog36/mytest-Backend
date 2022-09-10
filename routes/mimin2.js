const router = require("express").Router()
const Mimin2 = require("../models/Mimin2")


router.get("/all/:id", async(req,res) =>{
    try{
        const mimin2 = await Mimin2.find({})
         //res.status(200).json(userDethi.filter(function(dethi){
         //   return (dethi.userCreate == null)
       //  }))
         res.status(200).json(mimin2)
     } catch(err){
         return res.status(500).json(err)
     }
})

module.exports = router