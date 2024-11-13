const express = require("express");
const app = express();
const cors = require("cors")
const dbconnection = require(".//Model/dbConnextion")

dbconnection()
app.use(cors())
app.use(express.json())


app.use("/",require("./routes/product"))


const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`running server on ${PORT}`)
})