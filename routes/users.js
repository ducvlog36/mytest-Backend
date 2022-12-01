const router = require("express").Router()
const User = require("../models/User")
const Dethi = require("../models/Dethi")
const Cauhoi = require("../models/Cauhoi")
const Giaotrinh = require("../models/Giaotrinh")

//ユーザー情報の更新
router.put("/:id", async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin)
    {
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("ユーザー情報が更新できました")
        } catch(err){
            return res.status(500).json(err)
        }

    }else{
        return res.status(403).json("自分のアカウントの情報だけ更新できます")
    }
})
//ユーザー情報を削除
router.delete("/:id", async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin)
    {
        try{
            const user = await User.findByIdAndDelete(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("ユーザー情報が削除しました")
        } catch(err){
            return res.status(500).json(err)
        }

    }else{
        return res.status(403).json("自分のアカウントの情報だけ削除できます")
    }
})

//GEt user
router.get("/:id", async(req,res) =>{
       try{
            const user = await User.findById(req.params.id)
            const {password, updatedAt, ...other} = user._doc
            res.status(200).json(other)
        } catch(err){
            return res.status(500).json(err)
        }
})
//})

//Them de thi cho user
router.put("/:id/userThemdethi", async(req,res) => {
        try{
            const user = await User.findById(req.params.id)
            const dethi = await Dethi.findById(req.body.madethi)

            if(!user.danghoc.includes(req.body.madethi))
            {
                await user.updateOne({
                    $push: {
                        danghoc: req.body.madethi,
                    },
                })
                await dethi.updateOne({
                    $push:{
                        userId: req.params.id,
                    },
                })
                return res.status(200).json("Bạn đã lưu đề thi thành công")

            } else {
                return res.status(403).json("Đề thi này bạn đã lưu rồi")
            }
        } catch(err){
            return res.status(500).json(err)
        }
})

//user goi list câu lam sai
router.get("/:id/nhungcaulamsai", async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        const lamsaiId = user.caulamsai
        let causai = []
        for(let i = 0; i < lamsaiId.length; i++)
        {
            causai[i] = await Cauhoi.findById(lamsaiId[i])
        }
        return res.status(200).json(causai)
    }catch(err){
        return res.status(500).json(err)
    }
})

//user add de thi bang id de thi
router.get("/:id/userAddedDethi", async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        const danghoc = user.danghoc
        let dethi = []
        for(let i = 0; i < danghoc.length;i++){
            dethi[i] = await Dethi.findById(danghoc[i])
        }

        return res.status(200).json(dethi)
    }catch(err){
        return res.status(500).json(err)
    }
})

// get de thi tu vung cho user
router.get("/:id/baitaptuvung", async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        const tuvung = user.tuvung
        let dethi = []
        for(let i = 0; i < tuvung.length;i++){
            try{
                dethi[i] = await Giaotrinh.findById(tuvung[i])
            }catch{

            }
        }
        return res.status(200).json(dethi)
    }catch(err){
        return res.status(500).json(err)
    }
})


// user add tu vung
router.put("/:id/addbaitaptuvung", async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)

        if(!user.tuvung.includes(req.body.madethi))
        {
            await user.updateOne({
                $push: {
                    tuvung: req.body.madethi,
                },
            })
            return res.status(200).json("Bạn đã lưu đề thi thành công")

        } else {
            return res.status(403).json("Đề thi này bạn đã lưu rồi")
        }
    }catch(err){
        return res.status(500).json(err)
    }
})

//user xoa bai tap tu vung
router.put("/:id/xoabaitaptuvung", async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)

        if(user.tuvung.includes(req.body.madethi))
        {
            await user.updateOne({
                $pull: {
                    tuvung: req.body.madethi,
                },
            })
            return res.status(200).json("Xóa đề thi thành công")

        } else {
            return res.status(403).json("Bạn chưa lưu đề thi này")
        }
    }catch(err){
        return res.status(500).json(err)
    }
})

// Them cau lam sai cho user
router.put("/:id/themcaulamsai", async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        const causai = await Cauhoi.findById(req.body.cauhoiId)

        if(!user.caulamsai.includes(req.body.cauhoiId))
        {
            await user.updateOne({
                $push: {
                    caulamsai: req.body.cauhoiId,
                },
            })
            await causai.updateOne({
                $push: {
                    nguoilamsai: req.params.id,
                }
            })
            return res.status(200).json("Đề thi sai đã được lưu")

        } else {
            return res.status(403).json("Đề thi sai đã tồn tại")
        }
    } catch(err){
        return res.status(500).json(err)
    }
})

//User xóa câu làm sai
router.put("/:id/xoacaulamsai", async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        const cauhoi = await Cauhoi.findById(req.body.cauhoiId)
        if(user.caulamsai.includes(req.body.cauhoiId))
        {
            await user.updateOne({
                $pull: {
                    caulamsai: req.body.cauhoiId,
                },
            })
            await cauhoi.updateOne({
                $pull: {
                    nguoilamsai: req.params.id,
                },
            })
            return res.status(403).json("Đẫ xoa câu hỏi làm sai")

        } else {
            return res.status(403).json("Bạn không làm sai câu hỏi này")
        }
    } catch(err){
        return res.status(500).json(err)
    }

})

//Xoa de thi cho user xoa luon ca cau hoi
router.put("/:id/deleteDethi", async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        const dethi = await Dethi.findById(req.body.madethi)
        const cauhoiIds = dethi.cauhoi
        const cauhoi = []
        if(dethi.userCreate === null){
            for(let i = 0; i < cauhoiIds.length; i++){

                cauhoi[i] = await Cauhoi.findById(cauhoiIds[i])
                //if(!cauhoi.dethiId.includes(req.body.madethi)) i++
                    await cauhoi[i].updateOne({
                        $pull: {
                            dethiId: req.body.madethi,
                        },
                    })
                    await dethi.updateOne({
                        $pull:{
                            cauhoi: cauhoiIds[i]
                        }
                    })
            }
        } else{
                await Dethi.findByIdAndDelete(req.body.madethi, {
                    $set: req.body,
                })
        }
            return res.status(403).json("Đã xóa đề thi")
            
    }catch(err){
        return res.status(500).json(""+err)

    }
})

//user xóa đề thi đã lưu , xóa danh sách người làm bên đề thi
router.put("/:id/userXoadethi", async(req,res) => {
        try{
            const user = await User.findById(req.params.id)
            const dethi = await Dethi.findById(req.body.madethi)
            
            if(user.danghoc.includes(req.body.madethi))
            {
                await user.updateOne({
                    $pull: {
                        danghoc: req.body.madethi,
                    },
                })
                await dethi.updateOne({
                    $pull:{
                        userId: req.params.id,
                    },
                })
                return res.status(200).json("Bạn đã xóa đề thi thành công")

            } else {
                return res.status(200).json("Đề thi bạn không lưu")
            }
        } catch(err){
            return res.status(500).json(err)
        }
})

//user lam bai tu vung
router.put("/:id/nopbaituvung", async (req, res) => {

    if(req.body.nghia === null || req.body.nghia === undefined){
        try{
            const user = await User.findById(req.params.id)
            const giaotrinh = await Giaotrinh.findById(req.body.giaotrinh)
    
            let nguoilam = {
                iDnguoilam: user._id,
                name : user.username,
                cachdoc : req.body.cachdoc,
                nghia : req.body.nghia,
                vidu : req.body.vidu
            }
            let num = 0
            let tuvungs = giaotrinh.tuvung
            let tuvung = []
            tuvung[0]={
                id:req.body.id,
                nguoilam:[]
            }
            
            for(let i = 0; i < tuvungs.length; i++){
                if(tuvungs[i].id === req.body.id){
                    //Trường hợp người dùng insert cách đọc mới
                    if(tuvungs[i].nguoilam.length === 0){
                        tuvungs[i].nguoilam.push({
                            iDnguoilam: user._id,
                            name : user.username,
                            cachdoc : req.body.cachdoc,
                            nghia : req.body.nghia,
                            vidu : req.body.vidu
                        })
    
                        await giaotrinh.updateOne({
                            $set: {
                              tuvung:tuvungs
                            }
                          })
                          return res.status(200).json("Thành công");
                          //Trường hợp người dùng update cách đọc mới
                    }else{
                            for(let j = 0; j < tuvungs[i].nguoilam.length; j++){
                                if(tuvungs[i].nguoilam[j].iDnguoilam.toString() ===  user._id.toString()){
                                    tuvungs[i].nguoilam[j] = {
                                        iDnguoilam: user._id,
                                        name : user.username,
                                        cachdoc : req.body.cachdoc,
                                        nghia : req.body.nghia,
                                        vidu : req.body.vidu
                                    }
                                    num+=1
                                    await giaotrinh.updateOne({
                                        $set: {
                                          tuvung:tuvungs
                                        }
                                      })
        
                                    return res.status(200).json(tuvungs);
                                }
                            }
                            if(num < 1 ){
                                tuvungs[i].nguoilam.push({
                                    iDnguoilam: user._id,
                                    name : user.username,
                                    cachdoc : req.body.cachdoc,
                                    nghia : req.body.nghia,
                                    vidu : req.body.vidu
                                })
                                await giaotrinh.updateOne({
                                    $set: {
                                      tuvung:tuvungs
                                    }
                                  })
    
                                return res.status(200).json(tuvungs);
                            }
                    }
                }
    
            }
    
              return res.status(200).json(tuvungs);
    
        } catch (err) {
          return res.status(500).json("saothe nhi nopbaituvung!" + err);
        }
    }else{
        try{
            const user = await User.findById(req.params.id)
            const giaotrinh = await Giaotrinh.findById(req.body.giaotrinh)
    
            let num = 0
            let tuvungs = giaotrinh.tuvung            
            for(let i = 0; i < tuvungs.length; i++){
                if(tuvungs[i].id === req.body.id){
                   // Trường hợp người dùng insert kết quả
                    if(tuvungs[i].nguoilam.length === 0){
                        tuvungs[i].nguoilam.push({
                            iDnguoilam: user._id,
                            name : user.username,
                            cachdoc : req.body.cachdoc,
                            nghia : req.body.nghia,
                            vidu : req.body.vidu
                        })
    
                        await giaotrinh.updateOne({
                            $set: {
                              tuvung:tuvungs
                            }
                          })
                          return res.status(200).json(" add moi thanh cong");

                        // Trường hợp người dùng update kết quả
                    }else{
                            for(let j = 0; j < tuvungs[i].nguoilam.length; j++){
                                if(tuvungs[i].nguoilam[j].iDnguoilam.toString() ===  user._id.toString()){
                                    tuvungs[i].nguoilam[j] = {
                                        iDnguoilam: user._id,
                                        name : user.username,
                                        cachdoc : tuvungs[i].nguoilam[j].cachdoc,
                                        nghia : req.body.nghia,
                                        vidu : req.body.vidu
                                    }
                                    num+=1
                                    await giaotrinh.updateOne({
                                        $set: {
                                          tuvung:tuvungs
                                        }
                                      })
        
                                    return res.status(200).json(tuvungs);
                                }
                            }
                            if(num < 1 ){
                                tuvungs[i].nguoilam.push({
                                    iDnguoilam: user._id,
                                    name : user.username,
                                    cachdoc : req.body.cachdoc,
                                    nghia : req.body.nghia,
                                    vidu : req.body.vidu
                                })
                                await giaotrinh.updateOne({
                                    $set: {
                                      tuvung:tuvungs
                                    }
                                  })
    
                                return res.status(200).json(tuvungs);
                            }
                    }
                }
    
            }
    
              return res.status(200).json(tuvungs);
    
        } catch (err) {
          return res.status(500).json("saothe nhi nopbaituvung!" + err);
        }
    }

  });

module.exports = router