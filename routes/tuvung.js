const router = require("express").Router()
const Tuvung = require("../models/Tuvung")
//Get tat ca de thi
router.get("/all/:id", async(req,res) =>{
    try{
        const tuvung = await Tuvung.find({})
         //res.status(200).json(userDethi.filter(function(dethi){
         //   return (dethi.userCreate == null)
       //  }))
         res.status(200).json(tuvung)
     } catch(err){
         return res.status(500).json(err)
     }
})

// add file csv

const csv = require("csv-parser")
const fs = require("fs")

/*
router.get("/insert/csv", (req,res) =>{
    try{
        let rawdata = fs.readFileSync("mimin2.json")
        let mimin2 = JSON.parse(rawdata)

        setTimeout(console.log(mimin2),60000)
        

    }catch(err){
        return res.status(500).json(err)
    }
})
*/
router.get("/insert/csv", (req,res) =>{
    const data =[]
    try{
        fs.createReadStream("mimin2.json")
        .pipe(csv())
        .on("data", (row) =>{
            data.push(row)
            
            })
    .on("end", () =>{    })
            
    setTimeout(console.log(data),60000)

    }catch(err){
        return res.status(500).json(err)
    }
})


module.exports = router