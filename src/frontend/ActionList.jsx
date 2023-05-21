import PropTypes from 'prop-types';
import ActionItem from './ActionItem.jsx';

function ActionList(props) {

  const {
    items,
    onCompleteTask,
    onTaskNotesUpdate
  } = props

  let content
  if(items === null) {
    content = <div>Loading...</div>
  } else if(items.length === 0) {
    content = <div className="text-success" style={{marginLeft: '0.5em'}}><strong>You get all things done! Good job!</strong> <span className="material-icons" style={{verticalAlign: 'top'}}>celebration</span></div>
  } else {
    const itemElements = items.map((i) => <ActionItem 
      key={i.id}
      title={i.title}
      due={i.due}
      notes={i.notes}
      locked={i.locked}
      onRequestComplete={() => onCompleteTask(i.id)}
      onRequestNotesUpdate={(text) => onTaskNotesUpdate(i.id, text)}
    />)
    content = <table className="table"><tbody>{itemElements}</tbody></table>
  }

  return <div className="container">
      <div className="row">
        <div className="col">
          <h1><span className="material-icons" style={{verticalAlign: 'middle', fontSize: '1.5em'}}>work_history</span> Next Actions</h1>
          {content}
        </div>
      </div>
    </div>
}


ActionList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    due: PropTypes.string,
    notes: PropTypes.string,
    locked: PropTypes.bool,
    onCompleteTask: PropTypes.func,
    onTaskNotesUpdate: PropTypes.func,
  })),
}

ActionList.defaultProps = {
  items: [],
  onCompleteTask: () => {},
  onTaskNotesUpdate: () => {},
} 

export default ActionList