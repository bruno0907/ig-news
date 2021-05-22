import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna'
import { query } from 'faunadb'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID, // Info gerada NO PERFIL do github
      clientSecret: process.env.GITHUB_SECRET, // Info gerada NO PERFIL do github
      scope: 'read:user' // O oAuth do github precisa que o escopo da auth seja definida. Ver docs. Valores separados por vírgula
    })
  ],

  jwt: {
    signingKey: process.env.SIGNIN_KEY,
  },

  callbacks: {    
    async signIn(user, account, profile) {
      const { email } = user

      try {       
        await fauna.query(
          query.Create(
            query.Collection('users'),
            { data: { email }}
          )
        )

        return true        
      } catch {
        return false

      }
    },

  }  
})