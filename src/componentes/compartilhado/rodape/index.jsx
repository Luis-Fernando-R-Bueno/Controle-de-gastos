import {
  AtSign,
  CircleDollarSign,
  Database,
  Download,
  Link,
  Mail,
  Phone,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from 'lucide-react'
import './styles.css'

function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape__container">
        <section className="rodape__brand" aria-label="Resumo do sistema">
          <div className="rodape__logo" aria-hidden="true">
            <CircleDollarSign size={28} />
          </div>
          <div>
            <strong>Controle de Gastos Pessoais</strong>
            <p>
              Sistema web local para registrar despesas, acompanhar o mês e manter
              histórico financeiro sem depender de planilhas.
            </p>
          </div>
        </section>

        <section className="rodape__section" aria-label="Recursos do sistema">
          <h2>Sistema</h2>
          <ul>
            <li>
              <Database size={17} aria-hidden="true" />
              Dados salvos no navegador
            </li>
            <li>
              <WifiOff size={17} aria-hidden="true" />
              PWA com suporte offline
            </li>
            <li>
              <Download size={17} aria-hidden="true" />
              Backup e importação em JSON
            </li>
          </ul>
        </section>

        <section className="rodape__section" aria-label="Segurança e evolução">
          <h2>Projeto</h2>
          <ul>
            <li>
              <ShieldCheck size={17} aria-hidden="true" />
              Acesso local neste dispositivo
            </li>
            <li>
              <Smartphone size={17} aria-hidden="true" />
              Interface responsiva para celular
            </li>
            <li>
              <CircleDollarSign size={17} aria-hidden="true" />
              MVP financeiro pessoal
            </li>
          </ul>
        </section>

        <address className="rodape__section rodape__section--contact" aria-label="Contatos">
          <h2>Contato</h2>
          <a href="https://instagram.com/luisnanddo" target="_blank" rel="noreferrer">
            <AtSign size={17} aria-hidden="true" />
            @luisnanddo
          </a>
          <a href="tel:+5514998295951">
            <Phone size={17} aria-hidden="true" />
            (14) 99829-5951
          </a>
          <a href="mailto:77luisnando@gmail.com">
            <Mail size={17} aria-hidden="true" />
            77luisnando@gmail.com
          </a>
          <a
            href="https://github.com/Luis-Fernando-R-Bueno"
            target="_blank"
            rel="noreferrer"
          >
            <Link size={17} aria-hidden="true" />
            Luis-Fernando-R-Bueno
          </a>
        </address>
      </div>

      <div className="rodape__bottom">
        <span>© 2026 Luis Fernando Rodrigues Bueno.</span>
        <span>Controle pessoal de gastos, local e sem sincronização externa.</span>
      </div>
    </footer>
  )
}

export default Rodape
