import RetroPlayer from './RetroPlayer'
import './RetroPlayerWindow.css'

/**
 * Wrapper de RetroPlayer con titlebar Aero — se usa como ventana flotante
 * arrastrable en el WM (misma familia visual que MSN, donde_estas?, etc).
 */
export default function RetroPlayerWindow({
  onClose, onMin,
  src         = '/first-recording.mp3',
  artist      = '????',
  track       = 'xfavor no t olvides de esto',
  coverSrc,
  fileName    = 'this was the 1st recording i found of u on my computer.mp3',
}) {
  return (
    <section className="win rpw-win">
      <header className="rpw-title win-drag">
        <span className="rpw-t-icon" />
        <span className="rpw-t-text">{fileName}</span>
        <span className="rpw-t-ctrls">
          <button className="mc" onClick={onMin} title="minimizar">_</button>
          <button className="mc" title="maximizar">□</button>
          <button className="mc mc-x" onClick={onClose} title="cerrar">×</button>
        </span>
      </header>

      <div className="rpw-body">
        <RetroPlayer
          src={src}
          artist={artist}
          track={track}
          coverSrc={coverSrc}
        />
      </div>
    </section>
  )
}
