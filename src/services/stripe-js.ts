import { loadStripe } from '@stripe/stripe-js'

async function getStripeJs(){
  const stripejs = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)

  return stripejs
}

export { getStripeJs }