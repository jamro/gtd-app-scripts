import Navbar from "./Navbar.jsx"
import TaskItem from "./TaskItem.jsx";

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

  const completeTask = (id) => {
    setItems((prevItems) => prevItems.map(item => ({
      ...item,
      locked: item.id === id ? true : item.locked
    })))
    google.script.run
      .withSuccessHandler(() => {
        setItems((prevItems) => prevItems.filter(i => i.id !== id))
      })
      .withFailureHandler(setError)
      .inbox_completeTask(id)
  }

  let content
  if(error) {
    content = <div className="text-danger"><strong>{String(error)}</strong></div>
  } else if(items === null) {
    content = <div>Loading...</div>
  } else if(items.length === 0) {
    content = <div>Inbox is empty! Good job!</div>
  } else {
    const itemElements = items.map((i) => (
      <TaskItem 
        key={i.id} 
        title={i.title} 
        locked={i.locked}
        onRequestComplete={() => completeTask(i.id)}
      />
    ))
    content = <table className="table"><tbody>{itemElements}</tbody></table>
  }

  return <div>
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Your inbox</h1>
          <h5>Stuff to review</h5>
          {content}
        </div>
      </div>
    </div>
  </div>
}

export default InboxList
