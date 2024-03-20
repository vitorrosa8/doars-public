import './input-time.style.css'

export const InputTime = ({ isUpdate, onChange, hours, minutes }) => {
  const formatInput = (value, min, max) => {
    if (value > max) return max
    if (value < min) return min
    return value
  }

  const handleChange = changeEvent => {
    const { name, value } = changeEvent.target

    if (name === 'hours') {
      onChange({ target: { name, value: formatInput(parseInt(value), 0, 23) } })
    }

    if (name === 'minutes') {
      onChange({ target: { name, value: formatInput(parseInt(value), 0, 59) } })
    }
  }

  return (
    <div className='input-time'>
      <input
        name='hours'
        type='number'
        disabled={!isUpdate}
        onChange={handleChange}
        value={hours.toString().padStart(2, '0')}
        className={`${isUpdate && 'input-time__update'}`}
      />

      <span className={`${isUpdate && 'input-time__span'}`}>:</span>

      <input
        type='number'
        name='minutes'
        disabled={!isUpdate}
        onChange={handleChange}
        value={minutes.toString().padStart(2, '0')}
        className={`${isUpdate && 'input-time__update'}`}
      />
    </div>
  )
}
