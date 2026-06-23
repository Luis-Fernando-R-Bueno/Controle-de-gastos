import { ArrowLeft, Download, FileJson, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { downloadRecordsFile } from '../../utils/recordsFile'
import './styles.css'

function Importar({ onBack, onExportRecords, onImportRecords }) {
  const fileInputRef = useRef(null)
  const [feedback, setFeedback] = useState(null)

  function handleExport() {
    downloadRecordsFile(onExportRecords())
    setFeedback({
      type: 'success',
      title: 'Exportação concluída',
      details: ['Arquivo de registros gerado'],
    })
  }

  async function handleImport(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const text = await file.text()
      const data = JSON.parse(text)
      const result = onImportRecords(data)

      setFeedback({
        type: 'success',
        title: 'Importação concluída',
        details: [
          `${result.importedCount} importados`,
          `${result.skippedCount} duplicados ignorados`,
          `${result.invalidCount} inválidos`,
        ],
      })
    } catch {
      setFeedback({
        type: 'error',
        title: 'Arquivo inválido',
        details: ['Use um arquivo JSON exportado pelo sistema.'],
      })
    } finally {
      event.target.value = ''
    }
  }

  return (
    <section className="tela-importar" aria-label="Importar registros">
      <button
        className="tela-importar__back"
        type="button"
        aria-label="Voltar"
        title="Voltar"
        onClick={onBack}
      >
        <ArrowLeft size={18} aria-hidden="true" />
      </button>

      <div className="tela-importar__panel">
        <div className="tela-importar__icon" aria-hidden="true">
          <FileJson size={34} />
        </div>

        <div className="tela-importar__content">
          <h1>Importar registros</h1>
          <p>
            Selecione um arquivo JSON exportado pelo sistema. Registros idênticos
            aos já cadastrados serão ignorados automaticamente.
          </p>
        </div>

        <div className="tela-importar__actions">
          <button
            className="button button--ghost tela-importar__action"
            type="button"
            onClick={handleExport}
          >
            <Download size={18} aria-hidden="true" />
            Exportar registros
          </button>
          <button
            className="button button--primary tela-importar__action"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={18} aria-hidden="true" />
            Selecionar arquivo
          </button>
        </div>

        {feedback ? (
          <div className={`tela-importar__feedback tela-importar__feedback--${feedback.type}`}>
            <strong>{feedback.title}</strong>
            <span>{feedback.details.join(', ')}.</span>
          </div>
        ) : null}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleImport}
        />
      </div>
    </section>
  )
}

export default Importar
