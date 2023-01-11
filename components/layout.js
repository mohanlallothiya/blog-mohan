import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react"

export default function Layout({ children, home }) {
  const { data: session, status } = useSession()
 
  return (
    <div className={styles.maincontainer}>
      <Head>
        <link rel="icon" href="/images/logoimage1.jpg" />
        <title>Daily Blog | Notes</title>
        <meta
          name="description"
          content="share your happy moments, any trip experience , your success story, your struggle or anything that helps others in any way"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            "Daily Blog | Notes"
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content="Daily Blog | Notes" />
      </Head>
      <header className={styles.header}>
          <>
            <Image
              priority
              src="/images/logoimage.png"
              className={styles.logo}
              height={144}
              width={144}
              alt="logo"
            />
            <div className={styles.container}>
              <Link className={styles.link} href="/">Home</Link>
              <Link className={styles.link} href="/compose">Compose</Link>
              {!session && (
              <>
              <a
                href={`/api/auth/signin`}
                className={styles.signoutBtn}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign In
              </a>
              </>
              )}
              {session?.user && (
              <>
              <div className={styles.userCon}>
              {session.user.image && (
                <img className={styles.userImage} src={session.user.image}
                height={144}
                width={144}
                alt="user image"  />
              )}
                <p>{session.user.email.substring(0,10)}</p>
                <a
                href={`/api/auth/signout`}
                className={styles.signoutBtn}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign Out
              </a>
              </div>
              </>
              )}
              </div>
            </>
      </header>
      <main>{children}</main>
      <footer className={styles.footercon}>
      <h3 className={styles.copyright}>Designed by &copy; <a className={styles.copyrightLink} href="https://www.linkedin.com/in/mohanlallothiya" target="_blank">MOHAN LAL LOTHIYA</a></h3>
      </footer>
    </div>
  );
}