const mongoose = require('mongoose');
const connection= async (req, res) => {
    await mongoose.connect("mongodb+srv://root:root@cluster0.lryli.mongodb.net/").then(()=>{
        console.log("connected to database");
        
    })
}
module.exports=connection;
