import Layout from '../../components/layout';
import {getAllBlogIds, getBlogData} from '../../lib/blogs'
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths(){
   const paths=await getAllBlogIds();
   return {
    paths,
    fallback:false,
   };
}

export async function getStaticProps({params}){
    const blogData=await getBlogData(params.id);
    const parsedBlogData=JSON.parse(JSON.stringify(blogData))
    return {
        props:{parsedBlogData}
    };
}

export default function Blog({parsedBlogData}){
    return (
        <Layout>
            <section className={utilStyles.list}>
            <div style={{whiteSpace: 'pre-line'}} className={utilStyles.blogCon}>
            <h1 className={utilStyles.blogTitle}>{parsedBlogData.title}</h1>
            <p className={utilStyles.blogContent}>{parsedBlogData.content}</p>
            </div>
            </section>
        </Layout>
    )
}