import InboxItem from "./InboxItem.jsx";
import PropTypes from 'prop-types';

function InboxList(props) {

  const {
    items,
    onCompleteTask,
    onTrashTask,
    onDeferTask,
    onReferTask,
    references
  } = props

  let content
  if(items === null) {
    content = <div>Loading...</div>
  } else if(items.length === 0) {
    content = <div className="text-success" style={{marginLeft: '0.5em'}}><strong>Inbox is empty! Good job!</strong> <span className="material-icons" style={{verticalAlign: 'top'}}>celebration</span></div>
  } else {
    const itemElements = items.map((i) => (
      <InboxItem 
        key={i.id} 
        title={i.title} 
        due={(i.due)} 
        notes={i.notes} 
        locked={i.locked}
        references={references}
        onRequestComplete={() => onCompleteTask(i.id)}
        onRequestTrash={() => onTrashTask(i.id)}
        onRequestDefer={(title, notes, due, project) => onDeferTask(i.id, title, notes, due, project)}
        onRequestReference={(title, notes, docId) => onReferTask(i.id, title, notes, docId)}
      />
    ))
    content = <table className="table"><tbody>{itemElements}</tbody></table>
  }

  return <div className="container mb-5">
      <div className="row">
        <div className="col">
          <h1><span className="material-icons" style={{verticalAlign: 'middle', fontSize: '1.5em'}}>inbox</span> Your inbox</h1>
          {content}
        </div>
      </div>
    </div>
}


InboxList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    due: PropTypes.string,
    notes: PropTypes.string,
    locked: PropTypes.bool,
  })),
  references: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  onCompleteTask: PropTypes.func,
  onTrashTask: PropTypes.func,
  onDeferTask: PropTypes.func,
  onReferTask: PropTypes.func,
}

InboxList.defaultProps = {
  items: [],
  references: [],
  onCompleteTask: () => {},
  onTrashTask: () => {},
  onDeferTask: () => {},
  onReferTask: () => {},
}

export default InboxList
