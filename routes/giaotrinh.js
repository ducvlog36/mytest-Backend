const router = require("express").Router()
const Giaotrinh = require("../models/Giaotrinh")
const Tuvung = require("../models/Tuvung")

const fs = require("fs");

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
router.get("/all/:id", async(req,res) =>{
    const data2 = fs.readFileSync('tuvung_main.json', 'utf8');
    const database2 = JSON.parse(data2)
  
  
  
    const tuvung = []
    try{
        const giaotrinh = await Giaotrinh.findById(req.params.id)
        giaotrinh.tuvung.forEach(db1 => {
            database2.forEach(db => {
                if(db1 === db._id.$oid){
                    tuvung.push(db)
                }
            });
       });
       // 
       // 
//
       // 
//
       // const database = JSON.parse(data);
       // database
       //     .filter((db)=> {return db._id.$oid === req.params.id})
       //     .forEach(db => {
       //          giaotrinh.push(db)
       //     });
//


//console.log(tuvung)
console.log(tuvung.length)
 
       return res.status(200).json(tuvung)
    }catch(err){
        return res.status(500).json(":"+err)
    }
})

module.exports = router