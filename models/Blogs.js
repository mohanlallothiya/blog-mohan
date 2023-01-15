import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    owner:String,
    comments : [{comment : String,comment_user : String}],
})

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)