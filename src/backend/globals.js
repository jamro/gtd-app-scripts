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

function inbox_deferTask(id, title, notes, due) {
  backendApp.inbox.deferTask(id, title, notes, due)
}

function inbox_getReferenceDocuments() {
  return backendApp.reference.getDocuments()
}

function inbox_storeReference(taskId, title, notes, docId) {
  backendApp.reference.appendToDocument(docId, title, notes)
  //backendApp.inbox.trashTask(taskId)
}