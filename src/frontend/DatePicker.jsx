import PropTypes from 'prop-types';

function DatePicker(props) {
  const {
    id,
    value,
    onChange
  } = props

  const date = value ? new Date(value) : null

  const formatTimeField = (date, field, length) => {
    if(!date) return ''
    let value = date[field]()
    if(field === 'getUTCMonth') {
      value += 1
    }
    return String(value).padStart(length, '0')
  }

  const [year, setYear] = React.useState(formatTimeField(date, 'getUTCFullYear', 4));
  const [month, setMonth] = React.useState(formatTimeField(date, 'getUTCMonth', 2));
  const [day, setDay] = React.useState(formatTimeField(date, 'getUTCDate', 2));
  const [hour, setHour] = React.useState(formatTimeField(date, 'getUTCHours', 2));
  const [minutes, setMinutes] = React.useState(formatTimeField(date, 'getUTCMinutes', 2));

  const updateField = (e, fieldName) => {
    const updaters = {
      year: [year, setYear],
      month: [month, setMonth],
      day: [day, setDay],
      hour: [hour, setHour],
      minutes: [minutes, setMinutes],
    }

    updaters[fieldName][0] = e.target.value
    updaters[fieldName][1](e.target.value)

    let dateText = `${updaters.year[0]}-${updaters.month[0] || '01'}-${updaters.day[0] || '01'}T`
    dateText += `${updaters.hour[0] || '00'}:${updaters.minutes[0] || '00'}:00.000Z`

    onChange(updaters.year[0] ? dateText : undefined)
  }

  return <div className="input-group mb-3">
      <span className="input-group-text"><strong>Date:</strong></span>
      <input id={`${id}`} type="text" className="form-control text-center" placeholder="YYYY" maxLength={4} value={year} onChange={(e) => updateField(e, 'year')} />
      <span className="input-group-text">-</span>
      <input id={`${id}_m`} type="text" className="form-control text-center" placeholder="MM" maxLength={2} value={month} onChange={(e) => updateField(e, 'month')} />
      <span className="input-group-text">-</span>
      <input id={`${id}_m`} type="text" className="form-control text-center" placeholder="DD" maxLength={2} value={day} onChange={(e) => updateField(e, 'day')} />
      <span className="input-group-text"><strong>Time:</strong></span>
      <input id={`${id}_h`} type="text" className="form-control text-center" placeholder="hh" maxLength={2} value={hour} onChange={(e) => updateField(e, 'hour')} />
      <span className="input-group-text">:</span>
      <input id={`${id}_m`} type="text" className="form-control text-center" placeholder="mm" maxLength={2} value={minutes} onChange={(e) => updateField(e, 'minutes')} />
    </div>
}


DatePicker.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

DatePicker.defaultProps = {
  id: Math.round(Math.random()*0xffffffff).toString(16),
  value: "",
  onChange: () => {}
}

export default DatePicker