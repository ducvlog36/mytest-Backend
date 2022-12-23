
const router = require("express").Router()
const Tuvung = require("../models/Tuvung")
const User = require("../models/User");
const Giaotrinh = require("../models/Giaotrinh");
const Lophoc = require("../models/Lophoc");

router.post("/:user_id/taolophoc", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)
    const newLophoc = await new Lophoc({
      name: req.body.name,
      description: req.body.description,
      idHocsinh: [],
      userId: req.params.user_id,
    });

    const lophoc = await newLophoc.save();
    return res.status(200).json(lophoc);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const lophoc = await Lophoc.findById(req.params.id)
    return res.status(200).json(lophoc);
  } catch (err) {
    return res.status(500).json(err);
  }
});

/*
const db = mysql.createConnection({
  host:process.env.MYSQL,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DBNAME,
})

router.get("/test", (req,res)=>{
      const q = "SELECT * FROM User"
        db.query(q,(err, data) => {
          if (err) return res.status(500).json(err);
          console.log(data)
          return res.status(200).json(data);
        });
})
*/


module.exports = router