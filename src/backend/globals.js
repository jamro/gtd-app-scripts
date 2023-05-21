function install() {
  backendApp.installer.install()
}

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index');
}

function inbox_getItems() {
  return backendApp.inbox.getItems()
}

function inbox_completeTask(id) {
  backendApp.inbox.completeTask(id)
}

function inbox_trashTask(id) {
  backendApp.inbox.trashTask(id)
}

function inbox_snoozeTask(id, title, notes, duration) {
  backendApp.inbox.snoozeTask(id, title, notes, duration)
}

function inbox_deferTask(id, title, notes, due, project) {
  return backendApp.inbox.deferTask(id, title, notes, due, project)
}

function inbox_getReferenceDocuments() {
  return backendApp.reference.getDocuments()
}

function inbox_storeReference(taskId, title, notes, docId) {
  backendApp.reference.appendToDocument(docId, title, notes)
  backendApp.inbox.trashTask(taskId)
}

function inbox_createTask(title) {
  return backendApp.inbox.createTask(title)
}

function actions_getItems() {
  return backendApp.nextActions.getItems()
}

function actions_completeTask(id) {
  return backendApp.nextActions.completeTask(id)
}

function actions_updateTaskNotes(id, notes) {
  backendApp.nextActions.updateTaskNotes(id, notes)
}