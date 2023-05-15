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
        <button type="button" className="btn btn-success" onClick={() => onRequestComplete()} disabled={locked}>
          Complete
          <br />
          <small>(takes &lt; 2min)</small>
        </button>
        &nbsp;
        <button type="button" className="btn btn-danger" onClick={() => onRequestTrash()} disabled={locked}>
          Trash
          <br />
          <small>(no action)</small>
        </button>
        &nbsp;
        <button type="button" className="btn btn-primary" onClick={() => toggle('defer')} disabled={locked}>
          Defer It
          <br />
          <small>(do it ASAP)</small>
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