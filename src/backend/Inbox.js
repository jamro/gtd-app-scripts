export default class Inbox {

  getItems() {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    const now = new Date().getTime()
    return Tasks.Tasks.list(inboxId).items
      .filter(t => t.status === "needsAction")
      .filter(i => !i.due || new Date(i.due).getTime() <= now)

  }

  completeTask(taskId) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    Tasks.Tasks.patch({status: 'completed'}, inboxId, taskId)
  }

  trashTask(taskId) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    Tasks.Tasks.remove(inboxId, taskId)
  }

  snoozeTask(taskId, title, notes, duration) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')

    const now = new Date().getTime()
    const today = Math.floor(now/(24*60*60*1000))*24*60*60*1000
    const due = new Date(today + duration).toISOString()

    Tasks.Tasks.patch({due, title, notes}, inboxId, taskId)
  }

  deferTask(taskId, title, notes, due=undefined, project=undefined) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    const nextActionsId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_NEXT_ACTIONS')
    let newNotes = notes.replace(/\[PROJECT:.*]\n/g, '')

    if(project) {
      newNotes = `[PROJECT:${project}]\n` + newNotes
    }
    const newTask = Tasks.Tasks.insert({title, notes: newNotes, due}, nextActionsId)
    Tasks.Tasks.remove(inboxId, taskId)

    const now = new Date().getTime()
    if(!newTask.due || new Date(newTask.due).getTime() <= now) {
      return newTask
    }
    return null
  }

  createTask(title) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    return Tasks.Tasks.insert({title}, inboxId)
  }
}