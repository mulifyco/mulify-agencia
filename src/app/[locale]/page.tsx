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

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <StatsSection />
      <ServicesSection />
      <ValueProps />
      <FeaturedProjects />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
