const router = require("express").Router()
const Tuvung2 = require("../models/Tuvung2");
const Tuvung = require("../models/Tuvung")
const axios = require('axios');

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

  const tuvungs = await Tuvung.find({})
  let tuvung = []
  for(let i = 0; i < tuvungs.length; i++){
      const response = await axios.post("https://mazii.net/api/search",{
        dict: "javi",
        type: "word",
        query: tuvungs[i].tuvung, 
        limit: 20,
        page: 1
    })
    const newTuvung = await new Tuvung2({
      tuvung:  tuvungs[i].tuvung,
      mazzi: response.data}
      )
    await newTuvung.save() 
    console.log(response.data)
  }
    try{
        const response = await axios.post("https://mazii.net/api/search",{
          dict: "javi",
          type: "word",
          query: "大変", 
          limit: 20,
          page: 1
      })
      return res.status(200).json(tuvung);
    } catch (err) {
      return res.status(500).json("saothe nhi!" + err);
    }
  });


  //get all tu vung from mongo
router.get("/tuvung2", async (req, res) => {

  const tuvung = await Tuvung2.find({})

    return res.status(200).json(tuvung);

  });

module.exports = router