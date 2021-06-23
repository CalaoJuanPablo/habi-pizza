import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { HomePage } from '../frontend/components/HomePage'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Habi Pizza</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Habi Pizza</h1>
        <HomePage />
      </main>
    </div>
  )
}
