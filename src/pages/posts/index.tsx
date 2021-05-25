import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { getPrismicCliente } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import styles from './posts.module.scss'

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps{
  posts: Post[];
}

export default function Posts({ posts }: PostsProps){
  return(
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>   
          { posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}  
        </div>
      </main>
    </>  
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicCliente()

  const { results } = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  })  

  const posts = results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts
    }
  }
}