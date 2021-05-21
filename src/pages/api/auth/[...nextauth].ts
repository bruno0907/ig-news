import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID, // Info gerada NO PERFIL do github
      clientSecret: process.env.GITHUB_SECRET, // Info gerada NO PERFIL do github
      scope: 'read:user' // O oAuth do github precisa que o escopo da auth seja definida. Ver docs. Valores separados por vírgula
    })
  ]
})