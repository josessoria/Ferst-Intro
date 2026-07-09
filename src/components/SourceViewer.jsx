import './SourceViewer.css'

/**
 * Visor de "código fuente" — muestra el texto del disco como si fuera
 * el source code que renderiza la página. El gesto conceptual:
 * "porque yo sigo ahí en algún rincón · y no hay ficción".
 */
export default function SourceViewer({ open, onClose }) {
  if (!open) return null
  return (
    <>
      <div className="srcv-backdrop" onClick={onClose} />
      <div className="srcv" role="dialog" aria-modal="true">
        <header className="srcv-title">
          <span>view-source:http://c-me.net/welcome-2-our-memories.html</span>
          <button className="srcv-close" onClick={onClose} title="cerrar">×</button>
        </header>

        <div className="srcv-body">
          <pre className="srcv-code">
{`<!DOCTYPE recuerdo>
<html lang="es" data-theme="silkroad">
<head>
  <meta name="autor"    content="illuno · aka ferst">
  <meta name="direccion" content="fé">
  <meta name="version"  content="1 last time / like the 1st time">
</head>

`}<span className="c">{`<!-- fragmento del disco · fuente de todo esto -->`}</span>{`
<article id="sufro-tu-indiferencia">

`}<span className="s">{`Sufro tu indiferencia`}</span>{`
`}<span className="s">{`y no sé cuánto tiempo más puedo seguir haciendo esto.`}</span>{`
`}<span className="s">{`Sigo cultivando campos sobre campos`}</span>{`
`}<span className="s">{`y solo me devuelven malezas.`}</span>{`
`}<span className="s">{`Siempre malezas.`}</span>{`

`}<span className="s">{`Como si todo lo que toco terminara siempre creciendo torcido.`}</span>{`
`}<span className="s">{`Por eso vuelvo, y siempre vuelvo.`}</span>{`
`}<span className="s">{`Es un círculo, no una espiral.`}</span>{`

`}<span className="s">{`Camino las mismas calles y doy la misma vuelta`}</span>{`
`}<span className="s">{`esperando que esta vez sea diferente.`}</span>{`
`}<span className="s">{`Aunque ya sé que no.`}</span>{`

`}<span className="c">{`/* los inviernos son distintos siempre — no es que haga */`}</span>{`
`}<span className="c">{`/* más frío o menos. pero nada, lo romantizo igual.  */`}</span>{`

`}<span className="s">{`Voy a darme vuelta y vuelta y vuelta otra vez más`}</span>{`
`}<span className="s">{`hasta que ya no entienda nada.`}</span>{`
`}<span className="s">{`Hasta que me canse.`}</span>{`
`}<span className="s">{`Hasta que aprenda.`}</span>{`
`}<span className="s">{`Pero creo que ya no puedo aprender más,`}</span>{`
`}<span className="s">{`solamente repito.`}</span>{`

`}<span className="s">{`Y me pregunto si vas a sentir lo mismo si no estoy acá más,`}</span>{`
`}<span className="s">{`o voy a convertirme en una imagen más,`}</span>{`
`}<span className="s">{`una sombra que aparece cuando cierro los ojos.`}</span>{`
`}<span className="s">{`Porque yo sigo ahí en algún rincón`}</span>{`
`}<span className="s">{`y no hay ficción.`}</span>{`

`}<span className="s">{`Te recuerdo de todo lo que dije una vez.`}</span>{`
`}<span className="s">{`Lo vas a recordar cuando mires para arriba`}</span>{`
`}<span className="s">{`y veas mi nombre allá en las estrellas.`}</span>{`

`}<span className="c">{`/* ─── segunda parte ─── */`}</span>{`

`}<span className="s">{`Empezás una relación con alguien que vive escondido`}</span>{`
`}<span className="s">{`y no porque tenés miedo,`}</span>{`
`}<span className="s">{`sino porque a él le resulta más cómodo desaparecer.`}</span>{`

`}<span className="s">{`Distintas personas.`}</span>{`
`}<span className="s">{`No distintas: como que cambia.`}</span>{`
`}<span className="s">{`Cada encuentro protagonizado por alguien nuevo`}</span>{`
`}<span className="s">{`usando la misma cara.`}</span>{`

`}<span className="s">{`Hay días en los que es dulce,`}</span>{`
`}<span className="s">{`días en los que parece entenderte mejor que vos mismo.`}</span>{`
`}<span className="s">{`Y después desaparece.`}</span>{`
`}<span className="s">{`Y después desaparezco.`}</span>{`

`}<span className="c">{`/* archivo corrupto — reintentando... */`}</span>{`

`}<span className="s">{`Como habitaciones infinitas dentro de una misma casa.`}</span>{`
`}<span className="s">{`Cada una tiene una llave distinta.`}</span>{`
`}<span className="s">{`Ninguna abre la salida.`}</span>{`

</article>

`}<span className="c">{`<!-- fin del fragmento -->`}</span>{`
</html>`}
          </pre>
        </div>

        <footer className="srcv-foot">
          <span>{`líneas: 62 · autor: illuno · dirección: fé · encoding: utf-8`}</span>
          <button className="srcv-btn" onClick={onClose}>cerrar</button>
        </footer>
      </div>
    </>
  )
}
