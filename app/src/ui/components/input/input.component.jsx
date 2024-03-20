import './input.style.css'

export const Input = ({ type, name, value, placeholder, inForm, onChange, date }) => {
  return (
    <label className={`input__label ${inForm && 'input__in-form'}`}>
      <input
        className='input'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={date && (event => (event.target.type = 'date'))}
        required={date}
        autoComplete='new-password'
      />
    </label>
  )
}

Input.defaultProps = {
  image: '',
  type: 'text',
}
