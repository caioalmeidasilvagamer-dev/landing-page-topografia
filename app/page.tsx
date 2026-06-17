import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { ClientLogos } from '@/components/client-logos'
import { Services } from '@/components/services'
import { Equipment } from '@/components/equipment'
import { Differentials } from '@/components/differentials'
import { About } from '@/components/about'
import { CoverageMap } from '@/components/coverage-map'
import { Process } from '@/components/process'
import { Projects } from '@/components/projects'
import { GoogleRating } from '@/components/google-rating'
import { Testimonials } from '@/components/testimonials'
import { BlogPreview } from '@/components/blog-preview'
import { Calculator } from '@/components/calculator'
import { FAQ } from '@/components/faq'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ClientLogos />
      <Services />
      <Equipment />
      <Differentials />
      <About />
      <CoverageMap />
      <Process />
      <Projects />
      <GoogleRating />
      <Testimonials />
      <BlogPreview />
      <Calculator />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
