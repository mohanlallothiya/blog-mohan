import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"please specify first name"]
    },
    lastname:{
        type:String,
        required:[true,"please specify last name"]
    },
    username:{
        type:String,
        unique:true,
        required:[true,"please specify unique username"]
    },
    password:{
        type:String,
        minlength:6,
        required:[true,"please specify passsword"]
    },
})

module.exports = mongoose.models.User || mongoose.model('User', BlogSchema)