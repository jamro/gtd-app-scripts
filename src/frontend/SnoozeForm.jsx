import PropTypes from 'prop-types';

function SnoozeForm(props) {

  const {
    id,
    title,
    notes,
    onSubmit
  } = props

  const [newTitle, setNewTitle] = React.useState(title);
  const [duration, setDuration] = React.useState(24*60*60*1000);
  const [newNotes, setNewNotes] = React.useState(notes.replace(/\[PROJECT:.*]\n/g, ''));

  return <div className="card">
    <div className="card-header">
      <strong>Snooze</strong>
    </div>
    <div className="card-body">
      <div className="mb-3">
        <label forhtml={`titleInput_${id}`} className="form-label"><span className="material-icons" style={{verticalAlign: 'top'}}>label</span> Task Title</label>
        <input type="text" className="form-control" id={`titleInput_${id}`} value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label forhtml={`durationInput_${id}`} className="form-label"><span className="material-icons" style={{verticalAlign: 'top'}}>snooze</span> Duration</label>
        <select id={`durationInput_${id}`} className="form-select form-control" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
          <option value={24*60*60*1000}>a day</option>
          <option value={3*24*60*60*1000}>three days</option>
          <option value={7*24*60*60*1000}>a week</option>
          <option value={2*7*24*60*60*1000}>two weeks</option>
          <option value={30*24*60*60*1000}>a month</option>
          <option value={2*30*24*60*60*1000}>two months</option>
          <option value={3*30*24*60*60*1000}>three months</option>
        </select>
      </div>
      <div className="mb-3">
        <label forhtml={`notesInput_${id}`} className="form-label"><span className="material-icons" style={{verticalAlign: 'top'}}>description</span> Notes / Description</label>
        <textarea type="text" className="form-control" id={`notesInput_${id}`} rows={5} onChange={(e) => setNewNotes(e.target.value)} value={newNotes} />
      </div>
      <div className="mb-3" style={{textAlign: 'right'}}>
        <button type="submit" className="btn btn-primary mb-3" onClick={() => onSubmit(newTitle, newNotes, duration)}>Snooze</button>
      </div>
    </div>
  </div>
}

SnoozeForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  notes: PropTypes.string,
  onSubmit: PropTypes.func
}

SnoozeForm.defaultProps = {
  id: Math.round(Math.random()*0xffffffff).toString(16),
  title: "Unknown Task",
  notes: "",
  onSubmit: () => {}
}

export default SnoozeForm