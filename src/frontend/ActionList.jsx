import PropTypes from 'prop-types';

function ActionList(props) {

  const {
    items,
    onCompleteTask
  } = props

  console.log(items)

  const getDueBadge = (dateString) => {
    if(!dateString) return null
    return <span className="badge rounded-pill text-bg-primary" style={{verticalAlign: 'text-top'}}>
        due: {new Date(dateString).toLocaleDateString()}
      </span>
  } 

  let content
  if(items === null) {
    content = <div>Loading...</div>
  } else if(items.length === 0) {
    content = <div className="text-success" style={{marginLeft: '0.5em'}}><strong>You get all things done! Good job!</strong> <span className="material-icons" style={{verticalAlign: 'top'}}>celebration</span></div>
  } else {
    const itemElements = items.map((i) => (
      <tr key={i.id} id={i.id}>
        <td>
          <button type="button" className="btn btn-light text-success" onClick={() => onCompleteTask(i.id)}>
            <span className="material-icons" style={{verticalAlign: 'top'}} disabled={i.locked}>{i.locked ? 'published_with_changes' : 'check_circle_outline'}</span>
          </button> {i.title} {getDueBadge(i.due)}
        </td>
      </tr>
    ))
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
    onCompleteTask: PropTypes.func
  })),
}

ActionList.defaultProps = {
  items: [],
  onCompleteTask: () => {}
} 

export default ActionList