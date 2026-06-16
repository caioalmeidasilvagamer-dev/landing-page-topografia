import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Differentials } from '@/components/differentials'
import { Process } from '@/components/process'
import { Projects } from '@/components/projects'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Differentials />
      <Process />
      <Projects />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  )
}
