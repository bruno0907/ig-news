import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { RichText } from 'prismic-dom'
import { getPrismicCliente } from '../../services/prismic'

import style from './post.module.scss'

interface PostProps{
  post: {
    slug: string
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps){

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
            className={style.postContent}
            dangerouslySetInnerHTML={{__html: post.content}}
          />          
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })
  const { slug } = params  

  if(!session?.activeSubscription){
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false
      }
    }
  } 

  const prismic = getPrismicCliente(req)

  const response = await prismic.getByUID('post', String(slug), {})  

  const updatedAt = new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
    day: '2-digit', 
    month: 'long', 
    year: 'numeric'
  })

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt
  }  

  return {
    props: {
     post,
    }
  }  

}