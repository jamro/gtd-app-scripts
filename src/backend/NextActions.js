export default class NextActions {

  getItems() {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_NEXT_ACTIONS')
    const items = Tasks.Tasks.list(inboxId).items.filter(t => t.status === "needsAction")

    const now = new Date().getTime()
    return items
      .filter(i => !i.due || new Date(i.due).getTime() <= now)
      .sort()
  }

  completeTask(taskId) {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_NEXT_ACTIONS')
    Tasks.Tasks.patch({status: 'completed'}, inboxId, taskId)
  }
}