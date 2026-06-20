import type { Metadata } from 'next'
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import config from '@/site.config'

export const metadata: Metadata = {
  title: `Política de Privacidade | ${config.brand.name}`,
  description: `Como a ${config.brand.name} coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.`,
  robots: { index: true, follow: true },
}

export default function PoliticaDePrivacidadePage() {
  return (
    <main>
      <Navbar />

      <section className="relative py-20 lg:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="size-5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              LGPD · Lei nº 13.709/2018
            </span>
          </div>

          <h1 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-2">
            Política de Privacidade
          </h1>
          <p className="font-sans text-sm text-muted-foreground mb-12">
            Última atualização: 19 de junho de 2026
          </p>

          <div className="space-y-10 font-sans text-sm leading-relaxed text-foreground">
            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">1. Quem somos</h2>
              <p>
                Esta Política de Privacidade se aplica ao site da {config.brand.name}, empresa
                especializada em topografia e georreferenciamento, com atendimento em{' '}
                {config.contact.address}. Ao utilizar nosso site e enviar seus dados através do
                formulário de contato, você concorda com as práticas descritas neste documento, em
                conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">2. Quais dados coletamos</h2>
              <p className="mb-3">
                Coletamos os seguintes dados pessoais quando você preenche nosso formulário de
                contato ou solicita um orçamento:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li>Nome completo</li>
                <li>Telefone (com DDD)</li>
                <li>Cidade</li>
                <li>Tipo de serviço de interesse</li>
                <li>Mensagem com a descrição do projeto</li>
              </ul>
              <p className="mt-3">
                Também utilizamos cookies e tecnologias de análise (Vercel Analytics) para entender
                como os visitantes usam o site, de forma agregada e anônima — sem identificá-lo
                individualmente e sem fins de publicidade de terceiros.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">3. Para que usamos seus dados</h2>
              <p className="mb-3">Usamos os dados que você nos envia exclusivamente para:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li>Entrar em contato com você sobre o orçamento ou serviço solicitado</li>
                <li>Elaborar propostas técnicas e comerciais</li>
                <li>Esclarecer dúvidas sobre nossos serviços</li>
                <li>Cumprir obrigações legais e regulatórias, quando aplicável</li>
              </ul>
              <p className="mt-3">
                Não utilizamos seus dados para envio de spam, venda a terceiros ou qualquer
                finalidade não relacionada ao seu contato conosco.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">4. Base legal para o tratamento</h2>
              <p>
                O tratamento dos dados informados no formulário de contato é realizado com base no
                seu <strong>consentimento</strong> (art. 7º, I, da LGPD), fornecido no momento do
                envio do formulário. Você pode revogar esse consentimento a qualquer momento,
                conforme descrito na seção 7 abaixo.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">5. Com quem compartilhamos seus dados</h2>
              <p>
                Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins
                comerciais. Seus dados podem ser acessados apenas por prestadores de serviço
                estritamente necessários à operação do site (como hospedagem e ferramentas de
                comunicação, ex. WhatsApp Business), e por determinação legal ou ordem judicial,
                quando aplicável.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">6. Por quanto tempo guardamos seus dados</h2>
              <p>
                Mantemos seus dados pelo tempo necessário para cumprir a finalidade do contato
                comercial e, quando aplicável, pelo prazo exigido por obrigações legais, fiscais ou
                contratuais. Após esse período, os dados são eliminados ou anonimizados de forma
                segura.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">7. Seus direitos como titular dos dados</h2>
              <p className="mb-3">Conforme o art. 18 da LGPD, você tem direito a:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar os dados que temos sobre você</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Solicitar a portabilidade dos seus dados</li>
                <li>Solicitar a eliminação dos dados tratados com base no seu consentimento</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              <p className="mt-3">
                Para exercer qualquer um desses direitos, entre em contato pelos canais abaixo.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">8. Segurança dos dados</h2>
              <p>
                Adotamos medidas técnicas e administrativas razoáveis para proteger seus dados
                pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-lg mb-3">9. Alterações nesta política</h2>
              <p>
                Esta Política de Privacidade pode ser atualizada periodicamente para refletir
                mudanças em nossas práticas ou na legislação. A data da última atualização está
                indicada no topo desta página.
              </p>
            </section>

            <section className="pt-4 border-t border-border">
              <h2 className="font-heading font-semibold text-lg mb-4">10. Contato</h2>
              <p className="mb-4 text-muted-foreground">
                Para dúvidas sobre esta política ou para exercer seus direitos sobre seus dados
                pessoais, entre em contato:
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Mail className="size-4 text-primary shrink-0" />
                  <span>{config.contact.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 text-primary shrink-0" />
                  <span>{config.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>{config.contact.address}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
