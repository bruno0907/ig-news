import Prismic from '@prismicio/client'

const url = process.env.PRISMIC_API_URL
const accessToken = process.env.PRISMIC_ACCESS_TOKEN

function getPrismicCliente(req?: unknown){
  const prismic = Prismic.client(url, { 
    req, 
    accessToken 
  })

  return prismic
}

export { getPrismicCliente }