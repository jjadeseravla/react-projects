export default function Error({title, message}) {
  function onConfirm() {
    // Define what happens when the confirmation button is clicked
    console.log('Confirmation button clicked');
  }
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