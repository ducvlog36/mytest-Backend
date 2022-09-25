const router = require("express").Router();
const Cauhoi = require("../models/Cauhoi");

router.post("/themcauhoi", async (req, res) => {
  try {
    const newCauhoi = await new Cauhoi({
      stt: req.body.stt,
      mondai: req.body.mondai,
      noidung: req.body.noidung,
      img: req.body.img,
      dapan: req.body.dapan,
      dethiIdRoot: req.body.dethiId,
    });
    const cauhoi = await newCauhoi.save();
    return res.status(200).json(cauhoi);
  } catch (err) {
    return res.status(500).json("saothe nhi!" + err);
  }
});

//Get cau hoi theo id
router.get("/:id", async (req, res) => {
  try {
    const cauhoi = await Cauhoi.findById(req.params.id);
    return res.status(200).json(cauhoi);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get all cau hoi
router.get("/all/:id", async (req, res) => {
  try {
    const cauhoi = await Cauhoi.find({});
    return res.status(200).json(cauhoi);
  } catch (err) {
    return res.status(500).json(err);
  }
});

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
router.delete("/:id", async (req, res) => {
  try {
    const cauhoi = await Cauhoi.findByIdAndDelete(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Ban da xoa cau hoi");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//CSV read

const csv = require("csv-parser");
const fs = require("fs");

router.post("/all_csv/csv", async (req, res) => {
  const data = [];
  try {
    fs.createReadStream("bai_tap_ngay_6.csv")
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {});
    let noidung = {};
    let dapan = [];

    const AddCauhoi = async () => {
      try {
        for (let i = 0; i < data.length; i++) {
          noidung = {
            noidung: data[i].noidung,
            dich: data[i].dich,
          };

          let isdapan11 = false;
          let isdapan12 = false;
          let isdapan13 = false;
          let isdapan14 = false;

          if (data[i].isdapan1.includes("x")) {
            isdapan11 = true;
          }

          if (data[i].isdapan2.includes("x")) {
            isdapan12 = true;
          }

          if (data[i].isdapan3.includes("x")) {
            isdapan13 = true;
          }

          if (data[i].isdapan4.includes("x")) {
            isdapan14 = true;
          }

          dapan = [
            { stt: data[i].stt1, dich: data[i].dich1, isDapan: isdapan11 },
            { stt: data[i].stt2, dich: data[i].dich2, isDapan: isdapan12 },
            { stt: data[i].stt3, dich: data[i].dich3, isDapan: isdapan13 },
            { stt: data[i].stt4, dich: data[i].dich4, isDapan: isdapan14 },
          ];

          const newCauhoi = await new Cauhoi({
            mondai: "語彙",
            noidung: noidung,
            //img: req.body.img,
            dapan: dapan,
            dethiIdRoot: "632bc22344b8b6a1bb183ebb",
          });
          const cauhoi = await newCauhoi.save();
        }
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

//stt: req.body.stt,
//mondai: req.body.mondai,
//noidung: req.body.noidung,
//img: req.body.img,
//dapan: req.body.dapan,
//dethiIdRoot: req.body.dethiId

router.get("/all_csv/csv", async (req, res) => {
  const data = [];
  try {
    fs.createReadStream("Book1.csv")
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        console.log(data[1].dich4);

        const Addcauhoi = async () => {
          try {
            for (let i = 0; i < data.length; i++) {
              const newCauhoi = await new Cauhoi({
                stt: req.body.stt,
                mondai: req.body.mondai,
                noidung: req.body.noidung,
                img: req.body.img,
                dapan: req.body.dapan,
                dethiIdRoot: req.body.dethiId,
              });
              const cauhoi = await newCauhoi.save();
            }
          } catch (err) {
            return res.status(500).json("saothe nhi!" + err);
          }
        };
      });
    return res.status(200).String(data[1]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//router.post("/all_csv/csv", async (req, res) => {
//  const data = [];
//  try {
//    fs.createReadStream("bai_tap_ngay_5.csv")
//      .pipe(csv())
//      .on("data", (row) => {
//        data.push(row);
//      })
//      .on("end", () => {});
//    let noidung = {};
//    let dapan = [];
//
//    const AddCauhoi = async () => {
//      try {
//        for (let i = 0; i < data.length; i++) {
//          noidung = {
//            noidung: data[i].noidung,
//            dich: data[i].dich,
//          };
//
//          let isdapan11 = false;
//          let isdapan12 = false;
//          let isdapan13 = false;
//          let isdapan14 = false;
//
//          if (data[i].isdapan1.includes("x")) {
//            isdapan11 = true;
//          }
//
//          if (data[i].isdapan2.includes("x")) {
//            isdapan12 = true;
//          }
//
//          if (data[i].isdapan3.includes("x")) {
//            isdapan13 = true;
//          }
//
//          if (data[i].isdapan4.includes("x")) {
//            isdapan14 = true;
//          }
//
//          dapan = [
//            { stt: data[i].stt1, dich: data[i].dich1, isDapan: isdapan11 },
//            { stt: data[i].stt2, dich: data[i].dich2, isDapan: isdapan12 },
//            { stt: data[i].stt3, dich: data[i].dich3, isDapan: isdapan13 },
//            { stt: data[i].stt4, dich: data[i].dich4, isDapan: isdapan14 },
//          ];
//
//          const newCauhoi = await new Cauhoi({
//            mondai: "語彙",
//            noidung: noidung,
//            //img: req.body.img,
//            dapan: dapan,
//            dethiIdRoot: "6329b675ce448023e5c8f9e7",
//          });
//          const cauhoi = await newCauhoi.save();
//        }
//      } catch (err) {
//        return res.status(500).json("saothe nhi!" + err);
//      }
//    };
//
//    setTimeout(AddCauhoi, 2000);
//
//    return res.status(200).json(dapan);
//  } catch (err) {
//    return res.status(500).json(err);
//  }
//});
//
//stt: req.body.stt,
//mondai: req.body.mondai,
//noidung: req.body.noidung,
//img: req.body.img,
//dapan: req.body.dapan,
//dethiIdRoot: req.body.dethiId

//test đọc file ngữ pháp
router.get("/testnguphap/tes", async (req, res) => {
  const data = [];
  try {
    fs.createReadStream("nguphapShinN2.csv")
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
        console.log(data)
      })
      .on("end", () => {

      });
      return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json(err);
  }
});




module.exports = router;
