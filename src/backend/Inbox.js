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
    Tasks.Tasks.insert({title, notes, due}, nextActionsId)
    Tasks.Tasks.remove(inboxId, taskId)
  }

  createTask(title) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    return Tasks.Tasks.insert({title}, inboxId)
  }
}