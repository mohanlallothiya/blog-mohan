import Layout from '../../components/layout';
import {getBlogData} from '../../lib/blogs';
import utilStyles from '../../styles/utils.module.css';
import { signIn,useSession } from "next-auth/react";

export async function getServerSideProps(context){
    const {id}=context.query
    const blogData=await getBlogData(id);
    const parsedBlogData=JSON.parse(JSON.stringify(blogData))
    return {
        props:{parsedBlogData}
    };
}

export default function BlogPage({parsedBlogData}){
    const { data: session, status } = useSession()
    return (
        <Layout>
            <section className={utilStyles.list}>
            <div style={{whiteSpace: 'pre-line'}} className={utilStyles.blogCon}>
            <div className={utilStyles.blogHeader}>
                <h1 className={utilStyles.blogTitle}>{parsedBlogData.title}</h1>
                <p className={utilStyles.blogauthor}>- writtern by : {parsedBlogData.author}</p>
            </div>
            <p className={utilStyles.blogContent}>{parsedBlogData.content}</p>
            <hr />
            
            <h1 className={utilStyles.commentHead}>Comments</h1>
            <ul className={utilStyles.commentList}>
          {parsedBlogData.comments.map(({ _id, comment,comment_user }) => (
            <li key={_id}>
              <div style={{whiteSpace: 'pre-line'}}>
                <div className={utilStyles.commentUserCon}>
                <svg className={utilStyles.userIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <h1 className={utilStyles.blogTitle}>{comment_user}</h1>
                </div>
                <p className={utilStyles.comment}>{comment}</p>
                <hr />
              </div>
            </li>
          ))}
        </ul>
        {!session && (
            <div className={utilStyles.commentCon}>
                <textarea className={utilStyles.commentInputDisable} type="text" cols="40" rows="1" disabled placeholder="Please sign in to post your comment" />
                <a
                href={`/api/auth/signin`}
                className={utilStyles.postBtn+" "+utilStyles.commentsigninBtn}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </div>
        )}
        {session?.user && (
            <form action="/api/addcomment" method="post">
                <div className={utilStyles.commentCon}>
                <textarea className={utilStyles.formControl} required type="text" cols="40" rows="2" name="commentText"/>
                <input type="hidden" name="postId" value={parsedBlogData._id} />
                <input type="hidden" name="user" value={session.user.name} />
                <button className={utilStyles.postBtn+" "+utilStyles.submitBtn} type="submit">post</button>
                </div>
            </form>
        )}
            </div>
            </section> 
        </Layout>
    )
}