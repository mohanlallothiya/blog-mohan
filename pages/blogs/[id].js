import Layout from '../../components/layout';
import {getBlogData} from '../../lib/blogs';
import utilStyles from '../../styles/utils.module.css';

export async function getServerSideProps(context){
    const {id}=context.query
    const blogData=await getBlogData(id);
    const parsedBlogData=JSON.parse(JSON.stringify(blogData))
    return {
        props:{parsedBlogData}
    };
}

export default function BlogPage({parsedBlogData}){
    return (
        <Layout>
            <section className={utilStyles.list}>
            <div style={{whiteSpace: 'pre-line'}} className={utilStyles.blogCon}>
            <div className={utilStyles.blogHeader}>
                <h1 className={utilStyles.blogTitle}>{parsedBlogData.title}</h1>
                <p className={utilStyles.blogauthor}>- writtern by : {parsedBlogData.author}</p>
            </div>
            <p className={utilStyles.blogContent}>{parsedBlogData.content}</p>
            </div>
            </section> 
        </Layout>
    )
}
