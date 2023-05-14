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