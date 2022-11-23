const router = require("express").Router()
const Tuvung2 = require("../models/Tuvung2");
const Tuvung = require("../models/Tuvung2")


//tao tu vung vao mongo db
router.post("/addtuvung", async (req, res) => {
    try {

    const ListStt = []
    const tuvung = await Tuvung2.find({})
    for ( let i = 0; i < tuvung.length; i++){
        ListStt[i] = tuvung[i].stt
    }

    let maxStt = 0
        maxStt = Math.max(...ListStt)+1

      const newTuvung = await new Tuvung({
        stt: maxStt,
        tuvung: "tuvung 1",
        cachDoc: "cach doc 1",
        hanViet: "han viet 1",
        giaotrinh: "giao trinh",
        userId: "",
      });

    const Tv = await newTuvung.save();
      return res.status(200).json(Tv);
    } catch (err) {
      return res.status(500).json("saothe nhi!" + err);
    }
  });


//get all tu vung from mongo
router.get("/allmongo", async (req, res) => {
    try{
        const tuvung = await Tuvung2.find({})

      return res.status(200).json(tuvung);
    } catch (err) {
      return res.status(500).json("saothe nhi!" + err);
    }
  });


module.exports = router