const express = require("express")
const app = express();
const cors = require("cors")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const capdoRoute = require("./routes/capdodethi")
const cauhoiRoute = require("./routes/cauhoi")
const dethiRoute = require("./routes/dethi")
const tuvungRouter = require("./routes/tuvung")
const giaotrinhRouter = require("./routes/giaotrinh")
const lophocRouter = require("./routes/lophoc")
const tuvung2Router = require("./routes/tuvung2")


const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()

//connect database
mongoose
    .connect(process.env.MONGOURL)
    .then(()=>{
        console.log("db connected")
    })
    .catch((err) => {
        console.log(err)
    })


//middleware
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/capdo", capdoRoute)
app.use("/api/cauhoi", cauhoiRoute)
app.use("/api/dethi", dethiRoute)
app.use("/api/tuvung", tuvungRouter)
app.use("/api/giaotrinh", giaotrinhRouter)
app.use("/api/lophoc", lophocRouter)
app.use("/api/tuvung2", tuvung2Router)

app.get("/user", (req,res)=>{
    res.send("hello user")
})

app.listen(PORT, () => console.log(PORT+"サーバーが起動しました"))
