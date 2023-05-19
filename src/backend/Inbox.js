export default class Inbox {

  getItems() {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    return Tasks.Tasks.list(inboxId).items.filter(t => t.status === "needsAction")
  }

  completeTask(taskId) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    Tasks.Tasks.patch({status: 'completed'}, inboxId, taskId)
  }

  trashTask(taskId) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    Tasks.Tasks.remove(inboxId, taskId)
  }

  deferTask(taskId, title, notes, due=undefined) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    const nextActionsId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_NEXT_ACTIONS')
    const newTask = Tasks.Tasks.insert({title, notes, due}, nextActionsId)
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