import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { RichText } from 'prismic-dom'
import { getPrismicCliente } from '../../../services/prismic'

import style from '../post.module.scss'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface PostPreviewProps{
  post: {
    slug: string
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps){
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    session?.activeSubscription && router.push(`/posts/${post.slug}`)

  }, [session])


  return(
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>
      <main className={style.container}>
        <article className={style.post}>
          <h1>{post.title}</h1>      
          <time>{post.updatedAt}</time>
          <div
            className={`${style.postContent} ${style.previewContent}`}
            dangerouslySetInnerHTML={{__html: post.content}}
          />  

          <Link href="/">
            <div className={style.continueReading}>
              <a>Wanna continue reading? <span>Subscribe now </span>👈</a>
            </div>        
          </Link>            
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths  = async () => {
  return {
    paths: [],    
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {  
  const { slug } = params  

  const prismic = getPrismicCliente()

  const response = await prismic.getByUID('post', String(slug), {})  

  const updatedAt = new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
    day: '2-digit', 
    month: 'long', 
    year: 'numeric'
  })

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 2)),
    updatedAt
  }  

  return {
    props: {
     post,
    }
  }  

}