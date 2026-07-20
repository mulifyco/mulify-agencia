import { getLocale } from 'next-intl/server'
import type { PricingPlan } from '@/lib/db-types'
import PricingClient from './pricing-client'

export default async function PricingSection({ initialPlans }: { initialPlans: PricingPlan[] }) {
  const locale = await getLocale()
  return <PricingClient initialPlans={initialPlans} locale={locale} />
}
