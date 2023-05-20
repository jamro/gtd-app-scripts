import ActionList from "./ActionList.jsx";
import InboxList from "./InboxList.jsx"
import Navbar from "./Navbar.jsx";

function App() {


  const [inboxItems, setInboxItems] = React.useState(null);
  const [actionItems, setActionItems] = React.useState(null);
  const [creatingTask, setCreatingTask] = React.useState(false);
  const [references, setReferences] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // on mount
    setInboxItems(null)
    google.script.run
      .withSuccessHandler(setInboxItems)
      .withFailureHandler(setError)
      .inbox_getItems()

    google.script.run
      .withSuccessHandler(setActionItems)
      .withFailureHandler(setError)
      .actions_getItems()

    google.script.run
      .withSuccessHandler(setReferences)
      .withFailureHandler(setError)
      .inbox_getReferenceDocuments()
  }, []);

  const disableInboxItem = (id) => setInboxItems((prevItems) => prevItems.map(item => ({
    ...item,
    locked: item.id === id ? true : item.locked
  })))

  const disableActionItem = (id) => setActionItems((prevItems) => prevItems.map(item => ({
    ...item,
    locked: item.id === id ? true : item.locked
  })))

  const removeInboxItem = (id) => setInboxItems((prevItems) => prevItems.filter(i => i.id !== id))
  const removeActionItem = (id) => setActionItems((prevItems) => prevItems.filter(i => i.id !== id))
  const addInboxItem = (item) => setInboxItems((prevItems) => [...prevItems, item])
  const addActionItem = (item) => setActionItems((prevItems) => [...prevItems, item])

  const completeInboxTask = (id) => {
    disableInboxItem(id)
    google.script.run
      .withSuccessHandler(() => removeInboxItem(id))
      .withFailureHandler(setError)
      .inbox_completeTask(id)
  }

  const completeActionTask = (id) => {
    disableActionItem(id)
    google.script.run
      .withSuccessHandler((followUp) => {
        removeActionItem(id)
        if(followUp) {
          addInboxItem(followUp)
        }
      })
      .withFailureHandler(setError)
      .actions_completeTask(id)
  }

  const trashInboxTask = (id) => {
    disableInboxItem(id)
    google.script.run
      .withSuccessHandler(() => removeInboxItem(id))
      .withFailureHandler(setError)
      .inbox_trashTask(id)
  }

  const deferInboxTask = (id, title, notes, due, project) => {
    disableInboxItem(id)
    console.log({id, title, notes, due, project})
    google.script.run
      .withSuccessHandler((task) => {
        removeInboxItem(id)
        if(task) {
          addActionItem(task)
        }
      })
      .withFailureHandler(setError)
      .inbox_deferTask(id, title, notes, due, project)
  }

  const storeReference = (id, title, notes, docId) => {
    console.log({id, title, notes, docId})
    disableInboxItem(id)
    google.script.run
      .withSuccessHandler(() => removeInboxItem(id))
      .withFailureHandler(setError)
      .inbox_storeReference(id, title, notes, docId)
  }
  
  const createTask = (title) => {
    setCreatingTask(true)
    google.script.run
      .withSuccessHandler((data) => {
        addInboxItem(data)
        setCreatingTask(false)
      })
      .withFailureHandler(setError)
      .inbox_createTask(title)
  }

  if(error) {
    return <div className="text-danger">{String(error)}</div>
  }

  return <div>
    <Navbar 
      onSubmit={(title) => createTask(title)} 
      isProcessing={creatingTask} 
    />
    <InboxList 
      references={references}
      items={inboxItems}
      onCompleteTask={completeInboxTask}
      onTrashTask={trashInboxTask}
      onDeferTask={deferInboxTask}
      onReferTask={storeReference}
    />
    <ActionList 
      items={actionItems}
      onCompleteTask={completeActionTask}
    />
  </div>
}

export default App