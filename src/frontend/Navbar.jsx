import PropTypes from 'prop-types';

function Navbar(props) {
  const {
    isProcessing,
    onSubmit
  } = props;

  const [title, setTitle] = React.useState('');

  const handleKeyDown = (e) => {
    if(e.key === 'Enter' && title) {
      onSubmit(title)
      setTitle('')
    }
  }

  const input = isProcessing ? <span className="text-light">Processing...</span> : <input 
    className="form-control" 
    type="text" 
    value={title}
    onChange={e => setTitle(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="What's the thing you want to get done? Type it here and press ENTER." 
  />
  return <nav className="navbar bg-dark" data-bs-theme="dark" style={{marginBottom: '1em'}}>
    <div className="container-fluid">
        <span className="navbar-brand"><span className="material-icons" style={{verticalAlign: 'middle'}}>task_alt</span></span>
        <div className="flex-grow-1" role="search">
          {input}
        </div>
      </div>
    </nav>
}


Navbar.propTypes = {
  isProcessing: PropTypes.bool,
  onSubmit: PropTypes.func
}

Navbar.defaultProps = {
  isProcessing: false,
  onSubmit: () => {}
}

export default Navbar