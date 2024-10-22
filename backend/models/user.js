const mongoose= require('mongoose');
const UserSchema =  new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
    },
    password:{type:String,
        required: true
    },
    list:[{
        type: mongoose.Types.ObjectId,
        ref:'list'
    }]

});
module.exports = mongoose.model('user', UserSchema);