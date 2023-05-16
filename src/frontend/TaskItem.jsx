import PropTypes from 'prop-types';
import DeferForm from './DeferForm.jsx';
import ReferenceForm from './ReferenceForm.jsx';

function TaskItem (props) {

  const {
    title,
    notes,
    due,
    references,
    onRequestComplete,
    onRequestTrash,
    onRequestDefer,
    onRequestReference,
    locked
  } = props

  const [state, setState] = React.useState(null);
 
  const toggle = (newState) => {
    setState((oldState) => {
      if(oldState === newState) {
        return null
      } else {
        return newState
      }
    })
  }
  const colCount = 2

  const output = [<tr key="main-row">
      <td style={{verticalAlign: 'middle'}}>{title}</td>
      <td style={{textAlign: 'right'}}>
        <button type="button" className="btn btn-success" onClick={() => onRequestComplete()} disabled={locked} title="takes less than 2min">
          <span className="material-icons" style={{verticalAlign: 'top'}}>check_circle</span> Complete
        </button>
        &nbsp;
        <button type="button" className="btn btn-danger" onClick={() => onRequestTrash()} disabled={locked} title="nothing to do">
          <span className="material-icons" style={{verticalAlign: 'top'}}>delete</span> Trash
        </button> 
        &nbsp;
        <button type="button" className="btn btn-secondary" onClick={() => toggle('reference')} disabled={locked} title="retrievable when requried">
          <span className="material-icons" style={{verticalAlign: 'top'}}>folder_special</span> Reference
        </button>
        &nbsp;
        <button type="button" className="btn btn-primary" onClick={() => toggle('defer')} disabled={locked} title="to do as soon as I can">
          <span className="material-icons" style={{verticalAlign: 'top'}}>pending_actions</span> Defer it
        </button>
      </td>
    </tr>]

    if(!locked && state === 'defer') {
      output.push(<tr key="defer-row">
        <td colSpan={colCount}>
          <DeferForm 
            title={title} 
            notes={notes} 
            due={due}
            onSubmit={(title, notes, due) => onRequestDefer(title, notes, due)}
          />
        </td>
      </tr>)
    }
    if(!locked && state === 'reference') {
      output.push(<tr key="reference-row">
        <td colSpan={colCount}>
          <ReferenceForm 
            references={references}
            title={title} 
            notes={notes} 
            onSubmit={(name, notes, docId) => onRequestReference(name, notes, docId)}
          />
        </td>
      </tr>)
    }

    return output
}

TaskItem.propTypes = {
  title: PropTypes.string,
  notes: PropTypes.string,
  due: PropTypes.string,
  locked: PropTypes.bool,
  references: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  onRequestComplete: PropTypes.func,
  onRequestTrash: PropTypes.func,
  onRequestDefer: PropTypes.func,
  onRequestReference: PropTypes.func,
}

TaskItem.defaultProps = {
  title: "Unknown Task",
  notes: "",
  due: "",
  locked: false,
  references: [],
  onRequestComplete: () => {},
  onRequestTrash: () => {},
  onRequestDefer: () => {},
  onRequestReference: () => {},
}

export default TaskItem