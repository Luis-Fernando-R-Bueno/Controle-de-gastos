import {
  ArrowLeft,
  CalendarClock,
  Database,
  ImagePlus,
  ShieldCheck,
  Trash2,
  UserRound,
} from 'lucide-react'
import { useRef, useState } from 'react'
import '../styles.css'
import './styles.css'

const PROFILE_PHOTO_KEY = 'controle-gastos:perfil-foto'

function formatLoginDate(value) {
  if (!value) return 'Não informado'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return 'Não informado'

  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

function ConfiguracoesPerfil({ onBack, session }) {
  const fileInputRef = useRef(null)
  const [photo, setPhoto] = useState(() => localStorage.getItem(PROFILE_PHOTO_KEY) || '')
  const username = session?.username || 'luis.bueno'
  const displayName = 'Luis'

  function handleSelectPhoto(event) {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      const nextPhoto = typeof reader.result === 'string' ? reader.result : ''

      setPhoto(nextPhoto)
      localStorage.setItem(PROFILE_PHOTO_KEY, nextPhoto)
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  function handleRemovePhoto() {
    setPhoto('')
    localStorage.removeItem(PROFILE_PHOTO_KEY)
  }

  return (
    <section className="configuracoes-subpagina perfil-config" aria-label="Perfil">
      <div className="configuracoes__subnav">
        <button className="configuracoes__voltar" type="button" onClick={onBack}>
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar
        </button>
      </div>

      <section className="perfil-config__hero">
        <div className="perfil-config__photo-card">
          <button
            className="perfil-config__photo"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Selecionar foto de perfil"
            title="Selecionar foto de perfil"
          >
            {photo ? (
              <img src={photo} alt={`Foto de ${displayName}`} />
            ) : (
              <UserRound size={52} aria-hidden="true" />
            )}
          </button>

          <div className="perfil-config__identity">
            <span>Conta local</span>
            <strong>{displayName}</strong>
            <small>{username}</small>
          </div>

          <div className="perfil-config__actions">
            <button
              className="button button--primary"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus size={18} aria-hidden="true" />
              Alterar foto
            </button>
            {photo ? (
              <button className="button button--ghost" type="button" onClick={handleRemovePhoto}>
                <Trash2 size={18} aria-hidden="true" />
                Remover
              </button>
            ) : null}
          </div>
        </div>

        <div className="perfil-config__summary">
          <article className="perfil-config__metric">
            <ShieldCheck size={22} aria-hidden="true" />
            <div>
              <span>Acesso</span>
              <strong>Local</strong>
            </div>
          </article>

          <article className="perfil-config__metric">
            <CalendarClock size={22} aria-hidden="true" />
            <div>
              <span>Último login</span>
              <strong>{formatLoginDate(session?.loggedAt)}</strong>
            </div>
          </article>

          <article className="perfil-config__metric">
            <Database size={22} aria-hidden="true" />
            <div>
              <span>Dados</span>
              <strong>Neste navegador</strong>
            </div>
          </article>
        </div>

        <input
          ref={fileInputRef}
          className="perfil-config__input"
          type="file"
          accept="image/*"
          onChange={handleSelectPhoto}
        />
      </section>

      <section className="configuracoes__section">
        <div className="section-heading">
          <div>
            <span>Resumo</span>
            <h2>Como este perfil funciona</h2>
          </div>
        </div>

        <div className="configuracoes__conteudo">
          <p>
            Este perfil não depende de servidor. Ele identifica a sessão local e
            guarda a foto apenas no navegador deste dispositivo.
          </p>
          <p>
            Ao sair do sistema, apenas a sessão é removida. Seus gastos,
            categorias e backups continuam salvos localmente.
          </p>
        </div>
      </section>
    </section>
  )
}

export default ConfiguracoesPerfil
