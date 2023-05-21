import PropTypes from 'prop-types';

function ActionItem (props) {

  const {
    title,
    notes,
    due,
    onRequestComplete,
    onRequestNotesUpdate,
    locked
  } = props

  const [expanded, setExpanded] = React.useState(false);
  const [newNotes, setNewNotes] = React.useState(notes);
  const [changed, setChanged] = React.useState(false);

  const timeout = React.useRef(null)

  React.useEffect(() => {
    return () => {
      //hide
      if(timeout.current) {
        clearTimeout(timeout.current)
        setChanged(false)
        timeout.current = null
        onRequestNotesUpdate(newNotes)
      }
    }
  }, [])

  const onTextChanged = (e) => {
    const text = e.target.value
    setChanged(true)
    setNewNotes(text)
    if(timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(() => {
      onRequestNotesUpdate(text)
      setChanged(false)
    }, 700)
  }

  
  const getDueBadge = (dateString) => {
    if(!dateString) return null
    return <span className="badge rounded-pill text-bg-primary" style={{verticalAlign: 'text-top'}}>
        due: {new Date(dateString).toLocaleDateString()}
      </span>
  } 

  let moreButton = null
  let notesElement = null
  if(notes) {
    moreButton = <button type="button" className="btn btn-light float-end" onClick={() => setExpanded(e => !e)} disabled={locked}>
      <span className="material-icons" style={{verticalAlign: 'top'}} >{expanded ? 'expand_less' : 'expand_more'}</span>
    </button>
  }
  if(expanded) {
    notesElement = <div style={{paddingLeft: '3em', paddingTop: '0.5em'}}>
        <textarea className="form-control text-muted font-monospace small" rows="5" style={{fontSize: '0.8em', borderColor: changed ? '#00f' : '#ccc'}} onChange={onTextChanged} value={newNotes}></textarea>
      </div>
  }

  return <tr>
      <td>
        <div>
          <button type="button" className="btn btn-light text-success" onClick={() => onRequestComplete()} disabled={locked}>
            <span className="material-icons" style={{verticalAlign: 'top'}} >{locked ? 'published_with_changes' : 'check_circle_outline'}</span>
          </button> {title} {getDueBadge(due)}
          {moreButton}
        </div>
        {notesElement}
      </td>
    </tr>
}

ActionItem.propTypes = {
  title: PropTypes.string,
  notes: PropTypes.string,
  due: PropTypes.string,
  locked: PropTypes.bool,
  onRequestComplete: PropTypes.func,
  onRequestNotesUpdate: PropTypes.func,
}

ActionItem.defaultProps = {
  title: "Unknown Task",
  notes: "",
  due: "",
  locked: false,
  onRequestComplete: () => {},
  onRequestNotesUpdate: () => {}
}

export default ActionItem