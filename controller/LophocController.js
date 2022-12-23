const {db} = require("../db.js")

const TaoLophoc = (req, res) =>{
    const q = "SELECT * FROM User WHERE user_id = ?"
      
        db.query(q,1,(err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        });
}


