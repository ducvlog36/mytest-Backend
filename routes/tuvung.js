const router = require("express").Router()
const Tuvung = require("../models/Tuvung")
const csv = require("csv-parser");
const User = require("../models/User");
const Giaotrinh = require("../models/Giaotrinh");


const fs = require("fs")
//Get tat ca de thi
//router.get("/all/:id", async(req,res) =>{
//    try{
//        const tuvung = await Tuvung.find({})
//         res.status(200).json(tuvung.filter(function(tuvung){
//            return (tuvung.giaotrinh.includes("耳から覚えるN2"))
//         }))
//        //res.status(200).json(tuvung)
//     } catch(err){
//         return res.status(500).json(err)
//     }
//})


//get all tu vung tu local
router.get("/all/:id", async(req,res) =>{

    fs.readFile('tuvung_main.json', 'utf8', (err, data) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
            return res.status(500).json(err)
        } else {
            // parse JSON string to JSON object
            const tuvung = JSON.parse(data).sort(function(a,b){
                return b.index - a.index
            });
            res.status(200).json(tuvung.filter(function(tuvung){
                return (tuvung.giaotrinh.includes("耳から覚えるN3"))
             }))
            // print all databases
        }
    
    });
})



//Get từ vựng mimin2

router.get("/:id", async(req,res) =>{
    try{
        const data = fs.readFileSync(`${req.params.id}.json`, 'utf8')
        const database = JSON.parse(data)
         res.status(200).json(database)
     } catch(err){
         return res.status(500).json(err)
     }
})




router.get("/giaotrinh/:tengiaotrinh", async(req,res) =>{
    try{
        tengiaotrinh = req.params.tengiaotrinh
        const tuvung = await Tuvung.find({})
         res.status(200).json(userDethi.filter(function(dethi){
            return (dethi.userCreate == null)
         }))
         res.status(200).json(tuvung)
     } catch(err){
         return res.status(500).json(err)
     }
})


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

//tao tu vung vao mongo db
router.post("/addtuvung", async (req, res) => {
    try {
        const ListStt = []
        const tuvung = await Tuvung.find({})
        let requestObj = req.body
        for ( let i = 0; i < tuvung.length; i++){
            ListStt[i] = tuvung[i].stt
        }

        let maxStt = 1
        if(tuvung.length !== 0){
            maxStt = Math.max(...ListStt) + 1
        }
        
        requestObj.stt = maxStt
        const newTuvung = await new Tuvung(requestObj);

    const Tv = await newTuvung.save();
      return res.status(200).json(Tv);
    } catch (err) {
      return res.status(500).json("saothe nhi!" + err);
    }
  });


//get all tu vung from mongo
router.get("/allmongo/:id", async (req, res) => {
    try{
        const tuvung = await Tuvung.find({})
      return res.status(200).json(tuvung);

    } catch (err) {
      return res.status(500).json("saothe nhi!" + err);
    }
  });

//get tu vung theo giao trinh
router.get("/:id/giaotrinh", async (req, res) => {
    try{
        const giaotrinh = await Giaotrinh.findById(req.params.id)
        let tuvungs = giaotrinh.tuvung
        let tuvung = []
        for(let i = 0; i < tuvungs.length; i++){
            tuvung[i] = await Tuvung.findById(tuvungs[i].id)
        }
      return res.status(200).json(tuvung);

    } catch (err) {
      return res.status(500).json("saothe nhi!" + err);
    }
  });

//get tu vung theo id
router.get("/:id/tuvung", async (req, res) => {
    try{
        const tuvung = await Tuvung.findById(req.params.id)
        return res.status(200).json(tuvung);
    } catch (err) {
      return res.status(500).json("saothe nhi!" + err);
    }
  });


  //add tu cung vao giao trinh

//get tu vung theo giao trinh
router.get("/:id/tuvunggiaotrinh", async (req, res) => {
  try{
      const giaotrinh = await Giaotrinh.findById(req.params.id)
      let tuvungs = giaotrinh.tuvung
      let tuvung = []
      for(let i = 0; i < tuvungs.length; i++){
          tuvung[i] = await Tuvung.findById(tuvungs[i].id)
      }
    return res.status(200).json(giaotrinh);

  } catch (err) {
    return res.status(500).json("saothe nhi!" + err);
  }
});

//get tu vung theo id
router.get("/:id/tuvung", async (req, res) => {
  try{
      const tuvung = await Tuvung.findById(req.params.id)
      return res.status(200).json(tuvung);
  } catch (err) {
    return res.status(500).json("saothe nhi!" + err);
  }
});

//them tu vung vao de thi
  router.put("/:id/addtuvungvaogiaotrinh", async (req, res) => {

  try{
      const giaotrinh = await Giaotrinh.findById(req.params.id)
      let tuvungs = giaotrinh.tuvung
      let tuvung = []
      for(let i = 0; i < tuvungs.length; i++){
          tuvung[i] = tuvungs[i].id
      }

      if(tuvung.includes(req.body.id)){
        return res.status(200).json("tu vung da ton tai");

      }
      else{
        await giaotrinh.updateOne({
          $push: {
            tuvung:{
              id: req.body.id,
              nguoilam:[]
            }
          }
        })
        return res.status(200).json("thanh cong");
      }
  } catch (err) {
    return res.status(500).json("saothe nhi!" + err);
  }
});

//xoa tu vung vao de thi
router.put("/:id/xoatuvungvaogiaotrinh", async (req, res) => {

  try{
      const giaotrinh = await Giaotrinh.findById(req.params.id)
      let tuvungs = giaotrinh.tuvung
      let tuvung = []
      for(let i = 0; i < tuvungs.length; i++){
          tuvung[i] = tuvungs[i].id
      }

      if(tuvung.includes(req.body.id)){
        await giaotrinh.updateOne({
          $pull: {
            tuvung:{
              id: req.body.id,
              nguoilam:[]
            }
          }
        })
        return res.status(200).json("Xoa thanh cong");

      }
      else{

        return res.status(200).json("tu vung khong ton tai trong bai tap nay");
      }
  } catch (err) {
    return res.status(500).json("saothe nhi!" + err);
  }
});

//import tu vung tu file csv
router.post("/import/csv", async (req, res) => {
    const ListStt = []
    const tuvung = await Tuvung.find({})
    for ( let i = 0; i < tuvung.length; i++){
        ListStt[i] = tuvung[i].stt
    }

    let maxStt = 1
    if(tuvung.length !== 0){
        maxStt = Math.max(...ListStt) + 1
    }

  const data = [];
  try {
    fs.createReadStream("mimin3.csv")
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {});

    let tuvung = "";
    let cachDoc = ""
    let hanViet = ""
    let giaotrinh = ""
    let nghia = []
    let vidu = {}
    const AddCauhoi = async () => {
      try {
        for (let i = 0; i < data.length; i++) {
          tuvung = data[i].kanji
          cachDoc = data[i].hiragana
          hanViet = data[i].hanviet
          nghia = data[i].mean
          vidu = {
            vidu:data[i].vidu,
            dich:data[i].dichvidu
          }

          const newCauhoi = await new Tuvung({
            stt : maxStt+i,
            tuvung: tuvung,
            cachDoc: cachDoc,
            hanViet: hanViet,
            giaotrinh : "mimin3",
            nghia: nghia,
            vidu:vidu,
            capdo:"n3"
          });
          const cauhoi = await newCauhoi.save();
        }
        return res.status(200).json("import de thi thanh cong");

      } catch (err) {
        return res.status(500).json("saothe nhi!" + err);
      }
    };

    setTimeout(AddCauhoi, 2000);

    return res.status(200).json(dapan);
  } catch (err) {
    return res.status(500).json(err);
  }
});


module.exports = router