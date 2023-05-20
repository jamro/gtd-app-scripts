import PropTypes from 'prop-types';
import DatePicker from './DatePicker.jsx';

function DeferForm(props) {

  const {
    id,
    due,
    title,
    notes,
    onSubmit
  } = props

  const projectMatch = notes.match(/\[PROJECT:(.+)\]/)

  const [newTitle, setNewTitle] = React.useState(title);
  const [newNotes, setNewNotes] = React.useState(notes.replace(/\[PROJECT:.*]\n/g, ''));
  const [newDue, setNewDue] = React.useState(due);
  const [project, setProject] = React.useState(projectMatch ? projectMatch[1] : '');

  return <div className="card">
    <div className="card-header">
      <strong>Defer it</strong>
    </div>
    <div className="card-body">
      <div className="mb-3">
        <label forhtml={`titleInput_${id}`} className="form-label"><span className="material-icons" style={{verticalAlign: 'top'}}>label</span> Task Title</label>
        <input type="text" className="form-control" id={`titleInput_${id}`} value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label forhtml={`projectInput_${id}`} className="form-label"><span className="material-icons" style={{verticalAlign: 'top'}}>checklist_rtl</span> Project (optional)</label>
        <input type="text" className="form-control" id={`projectInput_${id}`} value={project} onChange={(e) => setProject(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label forhtml={`dueInput_${id}`} className="form-label"><span className="material-icons" style={{verticalAlign: 'top'}}>event</span> Due Date</label>
        <DatePicker id={`dueInput_${id}`} value={newDue} onChange={(v) => setNewDue(v)}/>
      </div>
      <div className="mb-3">
        <label forhtml={`notesInput_${id}`} className="form-label"><span className="material-icons" style={{verticalAlign: 'top'}}>description</span> Notes / Description</label>
        <textarea type="text" className="form-control" id={`notesInput_${id}`} rows={5} onChange={(e) => setNewNotes(e.target.value)} value={newNotes} />
      </div>
      <div className="mb-3" style={{textAlign: 'right'}}>
        <button type="submit" className="btn btn-primary mb-3" onClick={() => onSubmit(newTitle, newNotes, newDue, project)}>Defer it!</button>
      </div>
    </div>
  </div>
}

DeferForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  notes: PropTypes.string,
  due: PropTypes.any,
  onSubmit: PropTypes.func
}

DeferForm.defaultProps = {
  id: Math.round(Math.random()*0xffffffff).toString(16),
  title: "Unknown Task",
  notes: "",
  due: '',
  onSubmit: () => {}
}

export default DeferForm