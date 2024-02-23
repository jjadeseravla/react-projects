export default function Error({title, message}) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="condfirmation-actions">
          <button onClick={onConfirm} className="button">ok</button>
        </div>
      )}
    </div>
  )
}