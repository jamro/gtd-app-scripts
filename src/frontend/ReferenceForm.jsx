import PropTypes from 'prop-types';

function ReferenceForm(props) {

  const {
    id,
    title,
    notes,
    references,
    onSubmit
  } = props

  const [newTitle, setNewTitle] = React.useState(title);
  const [newNotes, setNewNotes] = React.useState(notes);
  const [docId, setDocId] = React.useState((references && references.length) ? references[0].id : '');

  const options = (references || []).map(({id, name}) => <option key={id} value={id}>{name}</option>)

  return <div className="card">
    <div className="card-header">
      <strong>Store reference</strong>
    </div>
    <div className="card-body">
      <div className="mb-3">
        <label forhtml={`docInput_${id}`} className="form-label">Document</label>
        <select id={`docInput_${id}`} className="form-select form-control" value={docId} onChange={(e) => setDocId(e.target.value)}>
          {options}
        </select>
      </div>
      <div className="mb-3">
        <label forhtml={`titleInput_${id}`} className="form-label">Task Title</label>
        <input type="text" className="form-control" id={`titleInput_${id}`} value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label forhtml={`notesInput_${id}`} className="form-label">Notes / Description</label>
        <textarea type="text" className="form-control" id={`notesInput_${id}`} rows={5} onChange={(e) => setNewNotes(e.target.value)} value={newNotes} />
      </div>
      <div className="mb-3" style={{textAlign: 'right'}}>
        <button type="submit" className="btn btn-primary mb-3" onClick={() => onSubmit(newTitle, newNotes, docId)}>Store</button>
      </div>
    </div>
  </div>
}

ReferenceForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  notes: PropTypes.string,
  references: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  onSubmit: PropTypes.func
}

ReferenceForm.defaultProps = {
  id: Math.round(Math.random()*0xffffffff).toString(16),
  title: "Unknown Task",
  notes: "",
  references: [],
  onSubmit: () => {}
}

export default ReferenceForm