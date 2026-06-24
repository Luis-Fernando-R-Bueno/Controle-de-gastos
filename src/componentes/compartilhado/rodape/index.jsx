import { AtSign, Link, Mail, Phone } from 'lucide-react'
import './styles.css'

function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape__container">
        <div className="rodape__contacts" aria-label="Contatos do projeto">
          <a
            className="rodape__contact"
            href="https://instagram.com/luisnanddo"
            target="_blank"
            rel="noreferrer"
            title="Instagram"
          >
            <AtSign size={18} aria-hidden="true" />
            <span>@luisnanddo</span>
          </a>
          <a className="rodape__contact" href="tel:+5514998295951" title="Telefone">
            <Phone size={18} aria-hidden="true" />
            <span>(14) 99829-5951</span>
          </a>
          <a className="rodape__contact" href="mailto:77luisnando@gmail.com" title="Email">
            <Mail size={18} aria-hidden="true" />
            <span>77luisnando@gmail.com</span>
          </a>
          <a
            className="rodape__contact"
            href="https://github.com/Luis-Fernando-R-Bueno"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <Link size={18} aria-hidden="true" />
            <span>Luis-Fernando-R-Bueno</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Rodape
