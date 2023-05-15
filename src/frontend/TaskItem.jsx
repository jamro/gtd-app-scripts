import PropTypes from 'prop-types';
import DeferForm from './DeferForm.jsx';

function TaskItem (props) {

  const {
    title,
    notes,
    due,
    onRequestComplete,
    onRequestTrash,
    onRequestDefer,
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

    return output
}

TaskItem.propTypes = {
  title: PropTypes.string,
  notes: PropTypes.string,
  due: PropTypes.string,
  locked: PropTypes.bool,
  onRequestComplete: PropTypes.func,
  onRequestTrash: PropTypes.func,
  onRequestDefer: PropTypes.func,
}

TaskItem.defaultProps = {
  title: "Unknown Task",
  notes: "",
  due: "",
  locked: false,
  onRequestComplete: () => {},
  onRequestTrash: () => {},
  onRequestDefer: () => {},
}

export default TaskItem