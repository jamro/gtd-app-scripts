import Navbar from "./Navbar.jsx"

function InboxList() {

  const [items, setItems] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // on mount
    setItems(null)
    google.script.run
      .withSuccessHandler(setItems)
      .withFailureHandler(setError)
      .inbox_getItems()
  }, []);

  let content
  if(error) {
    content = <li className="text-danger"><strong>{String(error)}</strong></li>
  } else if(items === null) {
    content = <li>Loading...</li>
  } else if(items.length === 0) {
    content = <li>Inbox is empty! Good job!</li>
  } else {
    content = items.map((i) => <li key={i.id}>{i.title}</li>)
  }

  return <div>
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Your inbox</h1>
          <h5>Stuff to review</h5>
          <ul>
            {content}
          </ul>
        </div>
      </div>
    </div>
  </div>
}

export default InboxList
