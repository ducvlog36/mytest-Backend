const router = require("express").Router()
const Tuvung = require("../models/Tuvung")


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
                return (tuvung.giaotrinh.includes("耳から覚えるN2"))
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


module.exports = router