import {getAllBlogData} from '../lib/blogs';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export async function getServerSideProps(){
  const allBlogs = await getAllBlogData();
  const parsedBlogData=JSON.parse(JSON.stringify(allBlogs))
  return {
    props:{parsedBlogData}
  };
}

export default function Home({parsedBlogData}) {
  return (
    <Layout home>
      <div className={utilStyles.headingCon}>
        <p className={utilStyles.heading}>Hii , I'm <strong> Mohan Lal Lothiya </strong> welcome you all to a safe, reliable, and free platform to share your ideas and opinions on any topic.
        Share your happy moments, any trip experience, your success story, your struggle, or anything that helps others in any way .
        <br/>For any query or feedback send an email to :<span className={utilStyles.email}> mohanjdh2016@gmail.com</span>
        </p>
      </div>
      <section >
      <ul className={utilStyles.list}>
          {parsedBlogData.map(({ _id, title,content,author }) => (
            <li key={_id}>
              <div style={{whiteSpace: 'pre-line'}} className={utilStyles.blogCon}>
                <div className={utilStyles.blogHeader}>
                <h1 className={utilStyles.blogTitle}>{title}</h1>
                <p className={utilStyles.blogauthor}>- writtern by : {author}</p>
                </div>
                <p className={utilStyles.blogContent}>{content.substring(0,260)}...<Link className={utilStyles.readmore} href={`/blogs/${_id}`}>Read More</Link></p>
              </div>
            </li>
          ))}
        </ul>
      </section>    
    </Layout>
  );
}