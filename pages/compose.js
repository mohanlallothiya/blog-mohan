import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { signIn,useSession } from "next-auth/react"
export default function Compose() {
  const { data: session, status } = useSession()
    return (
      <Layout>
        <Head>
        <title>Compose Blog | Notes</title>
        </Head>
        {!session && (
              <>
              <div className={utilStyles.composeMainCon}>
              <div class={utilStyles.box +" "+utilStyles.composeSigninCon}>
                <p>
                  Please Sign In to post your Blog.
                </p>
              <a
                href={`/api/auth/signin`}
                className={utilStyles.submitBtn}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
              </div>
              </div>
              </>
              )}
              {session?.user && (
              <section>
              <div className={utilStyles.composeMainCon}>
              <h1 className={utilStyles.composeHeading}>Compose New Blog | Note</h1>
              <form action="/api/saveblogs" method="post">
                <div className={utilStyles.composeSubCon}>
                  <label className={utilStyles.label}>Title</label>
                  <input className={utilStyles.formControl} type="text" name="postTitle" />
                </div>
                <div className={utilStyles.composeSubCon}>
                  <label className={utilStyles.label}>Post</label>
                  <textarea className={utilStyles.formControl} cols="40" rows="10" name="postBody">
                  </textarea>
                </div>
                <input className={utilStyles.formControl} type="hidden" name="postOwner" value={session.user.name} />
                <div>
                  <button className={utilStyles.submitBtn} type="submit">Publish</button>
                </div>
              </form>
            </div>
            </section>
              )}
        
      </Layout>
    );
  }