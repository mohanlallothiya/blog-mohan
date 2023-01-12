import dbConnect from './dbConnect'
import Blog from '../models/Blogs'

export async function getAllBlogData(){
    await dbConnect()
    try {
        const blogs = await Blog.find({})
        return blogs
    } catch (error) {
        return error
    }
}

export async function getBlogData(id){
    await dbConnect()
    try {
        const blogs = await Blog.findOne({_id:id})
        return blogs
    } catch (error) {
        return error
    }
}