import config from '@/site.config'
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
  const s = config.sections
  return (
    <main>
      {s.navbar && <Navbar />}
      {s.hero && <Hero />}
      {s.clientLogos && <ClientLogos />}
      {s.services && <Services />}
      {s.equipment && <Equipment />}
      {s.differentials && <Differentials />}
      {s.about && <About />}
      {s.coverage && <CoverageMap />}
      {s.process && <Process />}
      {s.projects && <Projects />}
      {s.googleRating && <GoogleRating />}
      {s.testimonials && <Testimonials />}
      {s.blog && <BlogPreview />}
      {s.calculator && <Calculator />}
      {s.faq && <FAQ />}
      {s.contact && <ContactForm />}
      {s.footer && <Footer />}
      {s.whatsapp && <WhatsAppButton />}
    </main>
  )
}
