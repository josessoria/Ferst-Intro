import './MosaicDialog.css'

/**
 * Diálogo modal reutilizable estilo Windows XP.
 * Uso: setDialog({ title, message, kind: 'info' | 'warning' | 'error' })
 *      setDialog(null) para cerrar
 */
export default function MosaicDialog({ dialog, onClose }) {
  if (!dialog) return null
  const { title = 'Aviso', message, kind = 'info', extra } = dialog
  return (
    <>
      <div className="mdlg-backdrop" onClick={onClose} />
      <div className={`mdlg mdlg-${kind}`} role="dialog" aria-modal="true">
        <header className="mdlg-title">
          <span className="mdlg-title-txt">{title}</span>
          <button className="mdlg-close" onClick={onClose} title="cerrar">×</button>
        </header>
        <div className="mdlg-body">
          <span className={`mdlg-icon mdlg-icon-${kind}`}>
            {kind === 'error' ? '×' : kind === 'warning' ? '!' : 'i'}
          </span>
          <div className="mdlg-content">
            <p className="mdlg-msg">{message}</p>
            {extra && <div className="mdlg-extra">{extra}</div>}
          </div>
        </div>
        <footer className="mdlg-foot">
          <button className="mdlg-btn" onClick={onClose}>Aceptar</button>
        </footer>
      </div>
    </>
  )
}
