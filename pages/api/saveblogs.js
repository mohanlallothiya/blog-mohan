import dbConnect from '../../lib/dbConnect'
import Blog from '../../models/Blogs'


export default async function handler (req, res) {
    await dbConnect()

    try {
        const blog = await Blog.create({
            title:req.body.postTitle,
            content:req.body.postBody,
            author:req.body.postOwner,
        })
        res.redirect("/")
    } catch (error) {
        res.send(error)
    }
  
  }