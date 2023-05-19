import PropTypes from 'prop-types';

function ActionItem (props) {

  const {
    title,
    notes,
    due,
    onRequestComplete,
    locked
  } = props

  const [expanded, setExpanded] = React.useState(false);

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
    notesElement = <pre className="small text-muted" style={{paddingLeft: '4em'}}>{notes}</pre>
  }

  return <tr>
      <td>
        <div>
          <button type="button" className="btn btn-light text-success" onClick={() => onRequestComplete()} disabled={locked}>
            <span className="material-icons" style={{verticalAlign: 'top'}} >{locked ? 'published_with_changes' : 'check_circle_outline'}</span>
          </button> {title} {getDueBadge(due)}
          <button type="button" className="btn btn-light text-success" onClick={() => onRequestComplete()} disabled={locked}></button>
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
}

ActionItem.defaultProps = {
  title: "Unknown Task",
  notes: "",
  due: "",
  locked: false,
  onRequestComplete: () => {},
}

export default ActionItem