import ChamadaInicial from '../../componentes/inicial/chamadaInicial'
import ContadorVite from '../../componentes/inicial/contadorVite'
import DivisorTicks from '../../componentes/inicial/divisorTicks'
import HeroVite from '../../componentes/inicial/heroVite'
import LinksVite from '../../componentes/inicial/linksVite'
import { useInicialVite } from '../../componentes/inicial/useInicialVite'
import './styles.css'

function Inicial() {
  const {
    contador,
    linksComunidade,
    linksDocumentacao,
    incrementarContador,
  } = useInicialVite()

  return (
    <section className="pagina-inicial" id="inicio">
      <section className="pagina-inicial__centro">
        <HeroVite />
        <ChamadaInicial />
        <ContadorVite
          contador={contador}
          onIncrementar={incrementarContador}
        />
      </section>

      <DivisorTicks />

      <LinksVite
        linksComunidade={linksComunidade}
        linksDocumentacao={linksDocumentacao}
      />

      <DivisorTicks />

      <section className="pagina-inicial__espaco" aria-hidden="true" />
    </section>
  )
}

export default Inicial
