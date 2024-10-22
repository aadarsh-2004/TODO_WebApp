const auth= require('./routes/Auth');
const list= require('./routes/List');
const express =require('express');
const cors =require('cors')
const app= express();

// db connection establish
const connection=require('./db.js');
connection();

// middleware
app.use(express.json());
app.use(cors());

//  Auth Api
app.use('/api/auth',auth);
//  List Api
app.use('/api/list',list);



// server port address
app.listen(3000,()=>{
    console.log("Server Started");
    
});