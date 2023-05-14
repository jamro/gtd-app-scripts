import PropTypes from 'prop-types';

function TaskItem (props) {

  const {
    title,
    onRequestComplete,
    locked
  } = props

  return <tr>
      <td style={{verticalAlign: 'middle'}}>{title}</td>
      <td className="text-end">
        <button type="button" className="btn btn-success" onClick={() => onRequestComplete()} disabled={locked}>
          Complete
          <br />
          <small>(takes &lt; 2min)</small>
        </button>
      </td>
    </tr>
}

TaskItem.propTypes = {
  title: PropTypes.string,
  locked: PropTypes.bool,
  onRequestComplete: PropTypes.func,
}

TaskItem.defaultProps = {
  title: "Unknown Task",
  locked: false,
  onRequestComplete: () => {},
}

export default TaskItem