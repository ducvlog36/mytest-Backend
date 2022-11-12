const router = require("express").Router();
const Dethi = require("../models/Dethi");
const Cauhoi = require("../models/Cauhoi");
const User = require("../models/User");

//Them de thi
router.post("/themdethi", async (req, res) => {
  try {
    const newDethi = await new Dethi({
      name: req.body.name,
      desc: req.body.desc,
      ispublic: req.body.ispublic,
      capdo: req.body.capdo,
    });
    const dethi = await newDethi.save();
    return res.status(200).json(dethi);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//User tao de thi
router.post("/:id/userTaodethi", async (req, res) => {
  try {
    const userId = req.params.id;

    const newDethi = await new Dethi({
      name: req.body.name,
      desc: req.body.desc,
      ispublic: req.body.ispublic,
      userCreate: userId,
    });
    const dethi = await newDethi.save();
    await dethi.updateOne({
      $push: {
        userId: req.params.id,
      },
    });
    return res.status(200).json(dethi);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Add lẻ từng cau hoi vao de thi
router.put("/:id/themcauhoi", async (req, res) => {
  try {
    const dethi = await Dethi.findById(req.params.id);
    const cauhoi = await Cauhoi.findById(req.body.cauhoiId);
    if (!dethi.cauhoi.includes(req.body.cauhoiId)) {
      await dethi.updateOne({
        $push: {
          cauhoi: req.body.cauhoiId,
        },
      });
      await cauhoi.updateOne({
        $push: {
          dethiId: req.params.id,
        },
      });
      return res.status(403).json("Đẫ thêm câu hỏi vào đề thi");
    } else {
      return res.status(403).json("Câu hỏi đã tồn tại trong bộ đề này");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Add list cau hoi vao de thi
router.put("/:id/listCauhoi", async (req, res) => {
  try {
    const dethi = await Dethi.findById(req.params.id);
    const cauhoi = req.body.cauhoiId;
    await dethi.updateOne({
      $set: {
        cauhoi: [],
      },
    });
    for(let i = 0; i < cauhoi.length; i++){
      if (!dethi.cauhoi.includes(req.body.cauhoiId)) {
        console.log(cauhoi[i])
        await dethi.updateOne({
          $push: {
            cauhoi: cauhoi[i],
          },
        });
      } else {
        i++
      }
    }
    return res.status(203).json("Đẫ thêm câu hỏi vào đề thi");

  } catch (err) {
    return res.status(500).json(err);
  }
});

//Xoa cau hoi ra khoi list cau hoi
router.put("/:id/xoacauhoiList", async (req, res) => {
  try {
    const dethi = await Dethi.findById(req.params.id);

    if (dethi.cauhoi.includes(req.body.cauhoiId)) {
      await dethi.updateOne({
        $pull: {
          cauhoi: req.body.cauhoiId,
        },
      });
      return res.status(403).json("Đẫ xoa câu hỏi khoi đề thi");
    } else {
      return res.status(403).json("Câu hỏi khong tồn tại trong bộ đề này");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Xoa cau hoi ra khoi de thi
router.put("/:id/xoacauhoi", async (req, res) => {
  try {
    const dethi = await Dethi.findById(req.params.id);
    const cauhoi = await Cauhoi.findById(req.body.cauhoiId);

    if (dethi.cauhoi.includes(req.body.cauhoiId)) {
      await dethi.updateOne({
        $pull: {
          cauhoi: req.body.cauhoiId,
        },
      });
      await cauhoi.updateOne({
        $pull: {
          dethiId: dethi.id,
        },
      });
      return res.status(403).json("Đẫ xoa câu hỏi khoi đề thi");
    } else {
      return res.status(403).json("Câu hỏi khong tồn tại trong bộ đề này");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});



//GEt De thi
router.get("/:id", async (req, res) => {
  try {
    const dethi = await Dethi.findById(req.params.id);
    res.status(200).json(dethi);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get tat ca de thi
router.get("/all/:id", async (req, res) => {
  try {
    const userDethi = await Dethi.find({});
    //res.status(200).json(userDethi.filter(function(dethi){
    //   return (dethi.userCreate == null)
    //  }))
    res.status(200).json(userDethi);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get cau hoi theo de thi
router.get("/cauhoi/:id", async (req, res) => {
  try {
    const dethi = await Dethi.findById(req.params.id);
    const listCauHoi = dethi.cauhoi;
    let cauhoi = [];
    for (let i = 0; i < listCauHoi.length; i++) {
      cauhoi[i] = await Cauhoi.findById(listCauHoi[i]);
    }
    return res.status(200).json(cauhoi);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get cau hoi theo id de thi
router.get("/cauhoi_dethiID/:id", async (req, res) => {
  try {
    const cauhoi = await Cauhoi.find({});
    const listCauHoi = cauhoi.filter(
      (cauhoi) => cauhoi.IdDethiRoot === req.params.id
    );
    //let cauhoi = []
    // for(let i = 0; i < listCauHoi.length ; i++){
    //     cauhoi[i] = await Cauhoi.findById(listCauHoi[i])
    // }
    return res.status(200).json(listCauHoi);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GEt đề thi theo user
router.get("/user/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const dethiIds = currentUser.danghoc;
    let dethis = [];
    for (let i = 0; i < dethiIds.length; i++) {
      dethis[i] = await Dethi.findById(dethiIds[i]);
    }
    res.status(200).json(dethis);
  } catch (err) {
    return res.status(500).json("+" + err);
  }
});



//Get de thi theo Id de thi
//GEt đề thi theo user
router.get("/dethibyId/:id", async (req, res) => {
  try {
    const dethi = await Dethi.findById(req.params.id);
    res.status(200).json(dethi);
  } catch (err) {
    return res.status(500).json("+" + err);
  }
});
//Sua de thi
router.put("/:id", async (req, res) => {
  try {
    const user = await Dethi.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Đề thi đã được thay đổi");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Xoa de thi
router.delete("/:id", async (req, res) => {
  try {
    const dethi = await Dethi.findByIdAndDelete(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Ban da xoa de thi");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Lưu kết quả vào đề thi
router.put("/:id/ketqua", async(req,res) => {
  try {

      const dethi = await Dethi.findById(req.params.id)
      const userName = req.body.userName
      const diemthi = req.body.diemthi
      let isCotennguoidung = 0
      const nguoihoc = {
        name: userName,
        diemthi: diemthi
      }

      const nguoihocUpdate = dethi.nguoiHoc

     if(dethi.nguoiHoc.length === 0){
       await dethi.updateOne({
         $push:{
           nguoiHoc: nguoihoc
         }
       })
     } else 
     {
         for(let i = 0; i < dethi.nguoiHoc.length; i++){
            if(nguoihocUpdate[i].name === userName){
              isCotennguoidung++
            }
            if(isCotennguoidung > 0){
              nguoihocUpdate[i] = nguoihoc
              await dethi.updateOne(
                {
                  $set: {
                    nguoiHoc : nguoihocUpdate
                  }
                }
              )
              break
            }
         }

         if(isCotennguoidung === 0) 
          {
            await dethi.updateOne(
              {
                $push: {
                  nguoiHoc : nguoihoc
                }
              }
            )
         }
     }

      return res.status(200).json("Nộp bài thành công")

  }
  catch(err){
      return res.status(500).json(err)
  }
})

module.exports = router;
