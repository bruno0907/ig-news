import Stripe from 'stripe'
import packageInfo from '../../package.json'

const stripe = new Stripe(
  String(process.env.STRIPE_SECRET_KEY), {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'Ignews',
      version: packageInfo.version
    }
  }
)

export { stripe }
