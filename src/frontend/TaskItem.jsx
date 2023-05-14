import PropTypes from 'prop-types';

function TaskItem (props) {

  const {
    title,
    onRequestComplete,
    onRequestTrash,
    locked
  } = props

  return <tr>
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
      </td>
    </tr>
}

TaskItem.propTypes = {
  title: PropTypes.string,
  locked: PropTypes.bool,
  onRequestComplete: PropTypes.func,
  onRequestTrash: PropTypes.func,
}

TaskItem.defaultProps = {
  title: "Unknown Task",
  locked: false,
  onRequestComplete: () => {},
  onRequestTrash: () => {},
}

export default TaskItem