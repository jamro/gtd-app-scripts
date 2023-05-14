export default class Inbox {

  getItems() {
    const inboxId = PropertiesService.getScriptProperties().getProperty('TASK_LIST_INBOX')
    return Tasks.Tasks.list(inboxId).items
  }
}