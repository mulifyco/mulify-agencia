import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/shared/navbar'
import HeroSection from '@/components/home/hero-section'
import LogoMarquee from '@/components/home/logo-marquee'
import StatsSection from '@/components/home/stats-section'
import ServicesSection from '@/components/home/services-section'
import ValueProps from '@/components/home/value-props'
import FeaturedProjects from '@/components/home/featured-projects'
import TestimonialsSection from '@/components/home/testimonials-section'
import PricingSection from '@/components/home/pricing-section'
import FAQSection from '@/components/home/faq-section'
import CTASection from '@/components/home/cta-section'
import Footer from '@/components/shared/footer'
import type { Project } from '@/lib/db-types'
import { getPricingPlans, PROJECT_CARD_COLUMNS } from '@/lib/public-content'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [{ data: projects }, pricingPlans] = await Promise.all([
    db()
      .from('Project')
      .select(PROJECT_CARD_COLUMNS)
      .eq('published', true)
      .order('order', { ascending: true })
      .limit(6),
    getPricingPlans(),
  ])

  return (
    <main>
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <StatsSection />
      <ServicesSection />
      <ValueProps />
      <FeaturedProjects projects={(projects ?? []) as Project[]} />
      <TestimonialsSection />
      <PricingSection initialPlans={pricingPlans} />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
