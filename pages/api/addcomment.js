import dbConnect from '../../lib/dbConnect'
import Blog from '../../models/Blogs'


export default async function handler (req, res) {
    await dbConnect()
    const {postId,commentText,user}=req.body
    try {
        Blog.updateOne({_id:postId},
            { $push:{comments:{comment:commentText,comment_user:user}}},{ upsert: true },function(err){
                if(!err){
                    res.redirect(`/blogs/${postId}`)
                }
            }
        );
    } catch (error) {
        res.send(error)
    }
}