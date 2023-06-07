import PropTypes from 'prop-types';

function ReferenceList(props) {

  const {
    references
  } = props

  let content = <div className="col">
      No references found
    </div>
  if(references.length > 0) {
    content = references
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(ref => (
        <div className="col-md-4 col-lg-2 mt-1 mb-1">
          <a href={`https://docs.google.com/document/d/${ref.id}/edit`} target="_blank" class="btn btn-light" style={{width: '100%'}}>
            <h5 className="text-secondary">
              <span className="material-icons" style={{verticalAlign: 'middle', fontSize: '1.5em'}}>description</span>
            </h5>
            {ref.name}
          </a>
        </div>
      ))
  }

  return <div className="container mb-5">
      <div className="row">
        <div className="col">
          <h1><span className="material-icons" style={{verticalAlign: 'middle', fontSize: '1.5em'}}>folder_special</span> References</h1>
        </div>
      </div>
      <div className="row">
        {content}
      </div>
    </div>
}


ReferenceList.propTypes = {
  references: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }))
}

ReferenceList.defaultProps = {
  items: []
}

export default ReferenceList
