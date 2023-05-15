import PropTypes from 'prop-types';

function DeferForm(props) {

  const {
    id,
    title,
    notes,
    onSubmit
  } = props

  const [newTitle, setNewTitle] = React.useState(title);
  const [newNotes, setNewNotes] = React.useState(notes);

  return <div className="card">
    <div className="card-header">
      <strong>Defer it</strong>
    </div>
    <div className="card-body">
      <div className="mb-3">
        <label forhtml={`titleInput_${id}`} className="form-label">Task Title</label>
        <input type="text" className="form-control" id={`titleInput_${id}`} value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label forhtml={`notesInput_${id}`} className="form-label">Notes / Description</label>
        <textarea type="text" className="form-control" id={`notesInput_${id}`} rows={5} onChange={(e) => setNewNotes(e.target.value)} value={newNotes} />
      </div>
      <div className="mb-3" style={{textAlign: 'right'}}>
        <button type="submit" className="btn btn-primary mb-3" onClick={() => onSubmit(newTitle, newNotes)}>Defer it!</button>
      </div>
    </div>
  </div>
}

DeferForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  notes: PropTypes.string,
  onSubmit: PropTypes.func
}

DeferForm.defaultProps = {
  id: Math.round(Math.random()*0xffffffff).toString(16),
  title: "Unknown Task",
  notes: "",
  onSubmit: () => {}
}

export default DeferForm