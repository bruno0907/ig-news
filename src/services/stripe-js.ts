import { loadStripe } from '@stripe/stripe-js'

const publishableKey = String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

async function getStripeJs(){
  const stripejs = await loadStripe(publishableKey)

  return stripejs
}

export { getStripeJs }