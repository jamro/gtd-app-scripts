export default class NextActions {

  getItems() {
    const nextActionsId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_NEXT_ACTIONS')
    const items = Tasks.Tasks.list(nextActionsId, {maxResults: 100}).items.filter(t => t.status === "needsAction")

    const now = new Date().getTime()
    return items
      .filter(i => !i.due || new Date(i.due).getTime() <= now)
      .sort((a, b) => String(a.position).localeCompare(String(b.position)))
  }

  completeTask(taskId) {
    const nextActionsId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_NEXT_ACTIONS')
    const completedTask = Tasks.Tasks.patch({status: 'completed'}, nextActionsId, taskId)
    const projectMatch = completedTask.notes ? completedTask.notes.match(/\[PROJECT:(.+)\]/) : null
    if(projectMatch) {
      const newNotes = completedTask.notes + `\nTask "${completedTask.title}" completed on ${new Date().toLocaleString()}"`
      const newTitle = "[Follw up] " + projectMatch[1]
      const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
      const newTask = Tasks.Tasks.insert({
        title: newTitle, 
        notes: newNotes
      }, inboxId)
      return newTask
    }
    return null
  }

  updateTaskNotes(taskId, notes) {
    const nextActionsId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_NEXT_ACTIONS')
    Tasks.Tasks.patch({notes}, nextActionsId, taskId)
  }
}