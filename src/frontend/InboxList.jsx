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

  const disableItem = (id) => setItems((prevItems) => prevItems.map(item => ({
    ...item,
    locked: item.id === id ? true : item.locked
  })))

  const removeItem = (id) => setItems((prevItems) => prevItems.filter(i => i.id !== id))

  const completeTask = (id) => {
    disableItem(id)
    google.script.run
      .withSuccessHandler(() => removeItem(id))
      .withFailureHandler(setError)
      .inbox_completeTask(id)
  }

  const trashTask = (id) => {
    disableItem(id)
    google.script.run
      .withSuccessHandler(() => removeItem(id))
      .withFailureHandler(setError)
      .inbox_trashTask(id)
  }

  const deferTask = (id, title, notes, due) => {
    console.log({id, title, notes, due})
    disableItem(id)
    google.script.run
      .withSuccessHandler(() => removeItem(id))
      .withFailureHandler(setError)
      .inbox_deferTask(id, title, notes, due)
  }

  console.log(items)

  let content
  if(error) {
    content = <div className="text-danger"><strong>{String(error)}</strong></div>
  } else if(items === null) {
    content = <div>Loading...</div>
  } else if(items.length === 0) {
    content = <div className="text-success" style={{marginLeft: '0.5em'}}><strong>Inbox is empty! Good job!</strong> <span class="material-icons" style={{verticalAlign: 'top'}}>celebration</span></div>
  } else {
    console.log(items)
    const itemElements = items.map((i) => (
      <TaskItem 
        key={i.id} 
        id={i.id} 
        title={i.title} 
        due={(i.due)} 
        notes={i.notes} 
        locked={i.locked}
        onRequestComplete={() => completeTask(i.id)}
        onRequestTrash={() => trashTask(i.id)}
        onRequestDefer={(title, notes, due) => deferTask(i.id, title, notes, due)}
      />
    ))
    content = <table className="table"><tbody>{itemElements}</tbody></table>
  }

  return <div>
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col">
          <h1><span class="material-icons" style={{verticalAlign: 'middle', fontSize: '1.5em'}}>inbox</span> Your inbox</h1>
          {content}
        </div>
      </div>
    </div>
  </div>
}

export default InboxList
