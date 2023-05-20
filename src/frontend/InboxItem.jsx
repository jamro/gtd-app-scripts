import PropTypes from 'prop-types';
import DeferForm from './DeferForm.jsx';
import ReferenceForm from './ReferenceForm.jsx';
import SnoozeForm from './SnoozeForm.jsx';
import { Tooltip } from './Tooltip.jsx';

function InboxItem (props) {

  const {
    title,
    notes,
    due,
    references,
    onRequestComplete,
    onRequestTrash,
    onRequestDefer,
    onRequestReference,
    onRequestSnooze,
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

  const actionableButtons = <div className="btn-group">
        <Tooltip text="Complete">
          <button type="button" className="btn btn-success" onClick={() => onRequestComplete()} disabled={locked} >
            <span className="material-icons" style={{verticalAlign: 'top'}}>check_circle</span>
          </button>
        </Tooltip>
        <Tooltip text="Defer it!">
          <button type="button" className="btn btn-primary" onClick={() => toggle('defer')} disabled={locked} >
            <span className="material-icons" style={{verticalAlign: 'top'}}>pending_actions</span>
          </button>
        </Tooltip>
      </div>

  const nonActionableButtons = <div className="btn-group">
      <Tooltip text="Snooze">
        <button type="button" className="btn btn-warning" onClick={() => toggle('snooze')} disabled={locked} >
          <span className="material-icons" style={{verticalAlign: 'top'}}>snooze</span>
        </button> 
      </Tooltip>
      <Tooltip text="Reference">
        <button type="button" className="btn btn-secondary" onClick={() => toggle('reference')} disabled={locked} >
          <span className="material-icons" style={{verticalAlign: 'top'}}>folder_special</span>
        </button>
      </Tooltip>
      <Tooltip text="Trash">
        <button type="button" className="btn btn-danger" onClick={() => onRequestTrash()} disabled={locked} >
          <span className="material-icons" style={{verticalAlign: 'top'}}>delete</span>
        </button> 
      </Tooltip>
    </div>

  const output = [<tr key="main-row">
      <td style={{verticalAlign: 'middle'}}>{title}</td>
      <td style={{textAlign: 'right'}}>
        {actionableButtons}
        &nbsp; &nbsp;
        {nonActionableButtons}
      </td>
    </tr>]

    if(!locked && state === 'defer') {
      output.push(<tr key="defer-row">
        <td colSpan={colCount}>
          <DeferForm 
            title={title} 
            notes={notes} 
            due={due}
            onSubmit={(title, notes, due, project) => onRequestDefer(title, notes, due, project)}
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
    if(!locked && state === 'snooze') {
      output.push(<tr key="snooze-row">
        <td colSpan={colCount}>
          <SnoozeForm 
            title={title} 
            notes={notes} 
            onSubmit={(name, notes, duration) => onRequestSnooze(name, notes, duration)}
          />
        </td>
      </tr>)
    }

    return output
}

InboxItem.propTypes = {
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
  onRequestSnooze: PropTypes.func,
}

InboxItem.defaultProps = {
  title: "Unknown Task",
  notes: "",
  due: "",
  locked: false,
  references: [],
  onRequestComplete: () => {},
  onRequestTrash: () => {},
  onRequestDefer: () => {},
  onRequestReference: () => {},
  onRequestSnooze: () => {},
  
}

export default InboxItem