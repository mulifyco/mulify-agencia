import { getPricingPlans } from '../actions'
import PricingClient from './pricing-client'

export default async function PricingPage() {
  const plans = await getPricingPlans()
  return <PricingClient initialPlans={plans} />
}
