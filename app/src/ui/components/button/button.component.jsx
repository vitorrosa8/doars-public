import './button.style.css'

export const Button = ({ type, text, onClick }) => {
  return (
    <button type={type} className='button' onClick={onClick}>
      {text}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
}
