const router = require('express').Router();
const User =require('../models/user');
const bcrypt = require('bcrypt');
// Sign up 
router.post('/register',async function(req, res) {
    const {email,username, password} = req.body;
    const existingUser = await User.findOne({ email });

    // check if user already exists
    if (existingUser) {
        return res.status(400).json({ message: "Email already exist" });
    }
    // hashing the password
    const salt= await bcrypt.genSalt(15);
    const hashPassword= await bcrypt.hash(password,salt);

    // If no existing user, create a new user
    const user = new User({ email, username, password:hashPassword });
    await user.save();
    res.status(201).json({message:"Sign up successfull"});

})
// login
router.post('/login',async function(req, res) {

    const user = await User.findOne({ email:req.body.email });
    if (!user) {
        return res.status(400).json({ error: "please signup first" }); 
    }
    const checkpassword = bcrypt.compare(user.password,req.body.password);
    if(!checkpassword) {
        return res.status(400).json({ error: "incorrect password" });    
    }
    const {password,...others} = user._doc;
    res.json({others});

});
module.exports = router;