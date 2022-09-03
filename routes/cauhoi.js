const router = require("express").Router()
const Cauhoi = require("../models/Cauhoi")

router.post("/themcauhoi", async (req,res) => {
    try{
        const newCauhoi = await new Cauhoi({
            stt: req.body.stt,
            mondai: req.body.mondai,
            noidung: req.body.noidung,
            img: req.body.img,
            dapan: req.body.dapan,
            dethiIdRoot: req.body.dethiId
        })
        const cauhoi = await newCauhoi.save()
        return res.status(200).json(cauhoi)
    } catch(err) {
        return res.status(500).json("saothe nhi!"+err)
    }
})

//Get cau hoi theo id
router.get("/:id",async (req, res) => {
    try{
        const cauhoi = await Cauhoi.findById(req.params.id)
        return res.status(200).json(cauhoi)
    } catch(err){
        return res.status(500).json(err)
    }
})

//Get all cau hoi
router.get("/all/:id", async (req, res) => {
    try{
        const cauhoi = await Cauhoi.find({})
        return res.status(200).json(cauhoi)
    } catch(err){
        return res.status(500).json(err)
    }
})

//Get cau hoi theo ID cau hoi
//router.get("/:id", async (req, res) => {
//    try{
//        const cauhoi = await Cauhoi.findById(res.params.id)
//        return res.status(200).json(cauhoi)
//    } catch(err){
//        return res.status(500).json(err)
//    }
//})//

//Dele cau hoi
router.delete("/:id", async(req,res) => {
        try{
            const cauhoi = await Cauhoi.findByIdAndDelete(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("Ban da xoa cau hoi")
        } catch(err){
            return res.status(500).json(err)
        }
})



module.exports = router