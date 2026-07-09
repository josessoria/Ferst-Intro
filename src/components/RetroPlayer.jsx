import { useEffect, useRef, useState } from 'react'
import './RetroPlayer.css'

/**
 * Reproductor de audio estilo Windows XP media player.
 * - src: URL del audio (opcional; si no hay, botones inactivos)
 * - artist / track: texto de los campos
 * - coverSrc: imagen del album (opcional). Si no hay, muestra placeholder.
 */
export default function RetroPlayer({
  src,
  artist = '????',
  track = 'xfavor no t olvides de esto',
  coverSrc,
}) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime   = () => setProgress(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration || 0)
    const onEnded  = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnded)
    }
  }, [src])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}) }
  }
  const stop = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause(); audio.currentTime = 0
    setPlaying(false); setProgress(0)
  }
  const skip = (delta) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(duration || 0, audio.currentTime + delta))
  }
  const scrub = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const val = Number(e.target.value)
    audio.currentTime = (val / 100) * duration
    setProgress(audio.currentTime)
  }

  const canControl = !!src

  return (
    <div className="retro-player">
      {src && <audio ref={audioRef} src={src} preload="metadata" />}

      <div className="rp-cover">
        {coverSrc ? (
          <img src={coverSrc} alt="album cover" />
        ) : (
          <span className="rp-cover-txt">(album<br/>cover<br/>here)</span>
        )}
      </div>

      <div className="rp-body">
        <div className="rp-field">
          <label>Artist:</label>
          <input type="text" value={artist} readOnly onChange={() => {}} />
          <button className="rp-drop" tabIndex={-1}>
            &lt;D:&gt;<span className="rp-arrow">▼</span>
          </button>
        </div>

        <div className="rp-field">
          <label>Track:</label>
          <input type="text" value={track} readOnly onChange={() => {}} />
          <button className="rp-drop" tabIndex={-1}>
            &lt;D:&gt;<span className="rp-arrow">▼</span>
          </button>
        </div>

        <div className="rp-progress-wrap">
          <input
            className="rp-progress"
            type="range"
            min="0" max="100"
            step="0.1"
            value={duration ? (progress / duration) * 100 : 0}
            onChange={scrub}
            disabled={!canControl}
          />
        </div>

        <div className="rp-buttons">
          {/* ︎ = VARIATION SELECTOR-15: fuerza render texto (no color emoji en iOS) */}
          <button className="rp-btn" title="anterior" onClick={() => skip(-10)} disabled={!canControl}>
            <span className="rp-ico">{'◀︎◀︎'}</span>
          </button>
          <button className="rp-btn" title="siguiente" onClick={() => skip(10)} disabled={!canControl}>
            <span className="rp-ico">{'▶︎▶︎'}</span>
          </button>
          <button className="rp-btn" title={playing ? 'pausar' : 'reproducir'} onClick={togglePlay} disabled={!canControl}>
            <span className="rp-ico">{playing ? '❙❙' : '▶︎'}</span>
          </button>
          <button className="rp-btn" title="detener" onClick={stop} disabled={!canControl}>
            <span className="rp-ico rp-ico-sq">{'■︎'}</span>
          </button>
          <button className="rp-btn" title="grabar" disabled>
            <span className="rp-ico rp-ico-rec">{'●︎'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
