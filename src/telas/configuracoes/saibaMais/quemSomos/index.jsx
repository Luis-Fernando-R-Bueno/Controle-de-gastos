import {
  ArrowLeft,
  BarChart3,
  Database,
  FileSpreadsheet,
  History,
  ReceiptText,
  Save,
  Smartphone,
  Tags,
} from 'lucide-react'
import { useEffect, useRef } from 'react'
import '../../styles.css'
import './styles.css'

const LINHA_DO_TEMPO = [
  {
    periodo: 'Origem',
    titulo: 'Uma planilha precisava virar sistema',
    texto:
      'O projeto nasceu da necessidade de substituir controles manuais em Excel por uma rotina mais simples para registrar e consultar gastos pessoais.',
    Icone: FileSpreadsheet,
  },
  {
    periodo: 'Primeira base',
    titulo: 'Cadastro de gastos direto ao ponto',
    texto:
      'A primeira entrega organizou data, categoria, valor e descrição opcional em um fluxo rápido, com persistência local no navegador.',
    Icone: ReceiptText,
  },
  {
    periodo: 'Organização',
    titulo: 'Categorias ganharam gestão própria',
    texto:
      'As categorias passaram a poder ser criadas, editadas, inativadas ou removidas, mantendo o histórico de gastos organizado por tipo de despesa.',
    Icone: Tags,
  },
  {
    periodo: 'Painel',
    titulo: 'O mês começou a se resumir sozinho',
    texto:
      'O dashboard passou a calcular totais, quantidade de lançamentos, maior categoria, gastos recentes e comparativos mensais automaticamente.',
    Icone: BarChart3,
  },
  {
    periodo: 'Histórico',
    titulo: 'Meses anteriores ficaram consultáveis',
    texto:
      'A tela de histórico passou a listar meses encerrados, permitindo abrir qualquer período no painel e revisar o comportamento financeiro passado.',
    Icone: History,
  },
  {
    periodo: 'Mobilidade',
    titulo: 'O sistema virou PWA',
    texto:
      'Com manifesto, ícones e service worker, o Controle de Gastos pode ser instalado no celular e aberto novamente mesmo sem conexão após o primeiro acesso.',
    Icone: Smartphone,
  },
  {
    periodo: 'Proteção local',
    titulo: 'Backup e configurações entraram no fluxo',
    texto:
      'A área de configurações passou a reunir perfil, categorias, segurança, suporte, informações do projeto e backup em JSON dos registros locais.',
    Icone: Save,
  },
  {
    periodo: 'Próximos passos',
    titulo: 'Uma base pronta para evoluir',
    texto:
      'A arquitetura continua local no MVP, mas já deixa caminho para uma API futura, banco de dados e sincronização entre dispositivos se isso fizer sentido.',
    Icone: Database,
  },
]

function ConfiguracoesQuemSomos({ onBack }) {
  const linhaRef = useRef(null)

  useEffect(() => {
    let frameLeitura = 0
    let frameAnimacao = 0
    let progressoAtual = 0
    let progressoAlvo = 0

    function aplicarProgresso(valor) {
      linhaRef.current?.style.setProperty('--linha-progresso', `${valor * 100}%`)
    }

    function calcularProgresso() {
      const linha = linhaRef.current

      if (!linha) return progressoAlvo

      const rect = linha.getBoundingClientRect()
      const posicaoLeitura = window.innerHeight * 0.42
      const progresso = (posicaoLeitura - rect.top) / Math.max(rect.height, 1)

      return Math.min(1, Math.max(0, progresso))
    }

    function animarProgresso() {
      const diferenca = progressoAlvo - progressoAtual

      if (Math.abs(diferenca) < 0.0008) {
        progressoAtual = progressoAlvo
        aplicarProgresso(progressoAtual)
        frameAnimacao = 0
        return
      }

      progressoAtual += diferenca * 0.22
      aplicarProgresso(progressoAtual)
      frameAnimacao = window.requestAnimationFrame(animarProgresso)
    }

    function atualizarProgresso(imediato = false) {
      if (frameLeitura) return

      frameLeitura = window.requestAnimationFrame(() => {
        progressoAlvo = calcularProgresso()

        if (imediato === true) {
          progressoAtual = progressoAlvo
          aplicarProgresso(progressoAtual)
          frameLeitura = 0
          return
        }

        if (!frameAnimacao) {
          frameAnimacao = window.requestAnimationFrame(animarProgresso)
        }

        frameLeitura = 0
      })
    }

    atualizarProgresso(true)
    window.addEventListener('scroll', atualizarProgresso, { passive: true })
    window.addEventListener('resize', atualizarProgresso)

    return () => {
      if (frameLeitura) window.cancelAnimationFrame(frameLeitura)
      if (frameAnimacao) window.cancelAnimationFrame(frameAnimacao)
      window.removeEventListener('scroll', atualizarProgresso)
      window.removeEventListener('resize', atualizarProgresso)
    }
  }, [])

  return (
    <section className="configuracoes-subpagina quem-somos" aria-label="Quem somos">
      <div className="configuracoes__subnav">
        <button className="configuracoes__voltar" type="button" onClick={onBack}>
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar
        </button>
      </div>

      <section className="configuracoes__section quem-somos__section">
        <div className="quem-somos__intro">
          <strong>Controle de Gastos Pessoais</strong>
          <span>
            Uma linha do tempo da evolução do MVP: da planilha manual para um app
            local, instalável e pronto para crescer.
          </span>
        </div>

        <div
          className="quem-somos__linha"
          aria-label="Linha do tempo do projeto"
          ref={linhaRef}
        >
          <div className="quem-somos__cursor" aria-hidden="true" />

          {LINHA_DO_TEMPO.map((marco, indice) => {
            const Icone = marco.Icone
            const lado = indice % 2 === 0 ? 'esquerda' : 'direita'

            return (
              <article
                className={`quem-somos__marco quem-somos__marco--${lado}`}
                key={marco.titulo}
              >
                <div className="quem-somos__ponto" aria-hidden="true">
                  <Icone size={22} aria-hidden="true" />
                </div>

                <div className="quem-somos__card">
                  <span className="quem-somos__periodo">{marco.periodo}</span>
                  <h2>{marco.titulo}</h2>
                  <p>{marco.texto}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </section>
  )
}

export default ConfiguracoesQuemSomos
