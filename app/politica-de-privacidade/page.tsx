import type { Metadata } from 'next'
import config from '@/site.config'

export const metadata: Metadata = {
  title: `Política de Privacidade — ${config.brand.name}`,
  description: `Política de privacidade e tratamento de dados pessoais da ${config.brand.name}.`,
}

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground mb-8">
          Política de Privacidade
        </h1>

        <div className="font-sans text-sm text-muted-foreground leading-relaxed space-y-6">
          <p className="text-xs text-muted-foreground/60">
            Última atualização: 19 de junho de 2025
          </p>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              1. Dados coletados
            </h2>
            <p>
              Ao preencher nosso formulário de contato, coletamos os seguintes dados pessoais:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Nome completo</strong> — para identificação e contato</li>
              <li><strong>Telefone / WhatsApp</strong> — para retorno sobre sua solicitação</li>
              <li><strong>Cidade / Estado</strong> — para verificação de atendimento regional</li>
              <li><strong>Tipo de serviço</strong> — para direcionamento ao especialista correto</li>
              <li><strong>Descrição do projeto</strong> — para elaboração de proposta técnica</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              2. Finalidade do tratamento
            </h2>
            <p>
              Os dados são utilizados exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Responder à sua solicitação de orçamento</li>
              <li>Elaborar proposta técnica e comercial personalizada</li>
              <li>Entrar em contato para esclarecimentos sobre o projeto</li>
            </ul>
            <p>
              Não utilizamos seus dados para marketing automatizado, envio de newsletters ou
              compartilhamento com terceiros para fins comerciais.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              3. Base legal
            </h2>
            <p>
              O tratamento dos seus dados é realizado com base no seu <strong>consentimento
              explícito</strong> (checkbox de confirmação no formulário) e na necessidade de
              execução de medida preliminar a contrato (art. 7º, V e IX, da Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              4. Prazo de retenção
            </h2>
            <p>
              Seus dados serão retidos pelo prazo necessário para atender à finalidade para a qual
              foram coletados, limitado a <strong>12 meses</strong> a partir do último contato.
              Após esse período, os dados serão excluídos de nossos sistemas, salvo quando houver
              obrigação legal de conservação.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              5. Seus direitos
            </h2>
            <p>
              Nos termos da LGPD, você tem direito a:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Confirmação</strong> da existência de tratamento de dados</li>
              <li><strong>Acesso</strong> aos seus dados pessoais</li>
              <li><strong>Correção</strong> de dados incompletos ou desatualizados</li>
              <li><strong>Anonimização, bloqueio ou eliminação</strong> de dados desnecessários</li>
              <li><strong>Exclusão</strong> dos dados tratados com consentimento</li>
              <li><strong>Revogação do consentimento</strong>, a qualquer momento</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              6. Como solicitar exclusão dos seus dados
            </h2>
            <p>
              Para exercer qualquer um dos direitos acima, entre em contato pelo e-mail{' '}
              <a href={`mailto:${config.contact.email}`} className="text-primary hover:underline">
                {config.contact.email}
              </a>{' '}
              ou pelo WhatsApp{' '}
              <a
                href={`https://wa.me/${config.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {config.contact.phone}
              </a>.
              Responderemos sua solicitação em até 15 dias úteis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              7. Segurança dos dados
            </h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos
              não autorizados, situações acidentais ou ilícitas de destruição, perda, alteração,
              comunicação ou qualquer forma de tratamento inadequado ou ilícito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              8. Contato
            </h2>
            <p>
              Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus
              dados, entre em contato:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>E-mail:</strong> {config.contact.email}</li>
              <li><strong>Telefone:</strong> {config.contact.phone}</li>
              <li><strong>Endereço:</strong> {config.contact.address}</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <a href="/" className="font-sans text-sm text-primary hover:underline">
            ← Voltar para a página inicial
          </a>
        </div>
      </div>
    </div>
  )
}
