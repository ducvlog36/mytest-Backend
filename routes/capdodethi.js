const router = require("express").Router()
const Capdodethi = require("../models/Capdothi")

router.post("/themcapdo", async (req,res) => {
    try{
        const newCapdo = await new Capdodethi({
            capdo: req.body.capdo
        })
        const capdo = await newCapdo.save()
        return res.status(200).json(capdo)
    } catch(err) {
        return res.status(500).json(err)
    }
})

//Them de thi vao cap do
router.put("/:id/themdethi", async(req,res) => {
    try{
        const capdo = await Capdodethi.findById(req.params.id)

        if(!capdo.madethi.includes(req.body.dethiId))
        {
            await capdo.updateOne({
                $push: {
                    madethi: req.body.dethiId,
                },
            })
            return res.status(200).json("Đẫ thêm đề thi vào cap do")

        } else {
            return res.status(403).json("Đề thi đã tồn tại trong cấp độ này")
        }
    } catch(err){
        return res.status(500).json(err)
    }
})

//Xoa de thi ra khi cap do
router.put("/:id/xoadethi", async(req,res) => {
    try{
        const capdo = await Capdodethi.findById(req.params.id)

        if(capdo.madethi.includes(req.body.dethiId))
        {
            await dethi.updateOne({
                $pull: {
                    madethi: req.body.dethiId,
                },
            })
            return res.status(200).json("Đẫ xoa đề thi khoi cấp độ này")

        } else {
            return res.status(403).json("đề thi khong tồn tại trong cấp độ này")
        }
    } catch(err){
        return res.status(500).json(err)
    }

})

//Get toan bo capdo de thi
router.get("/", async(req,res) =>{
    try{
        const capdo = await Capdodethi.find({})
        return res.status(200).json(capdo)
    }catch(err){
        return res.status(500).json(":"+err)
    }
})

module.exports = router