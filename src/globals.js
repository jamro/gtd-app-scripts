const {
  Installer
} = app.default


function install() {
  const installer = new Installer()
  installer.install()
}
function doGet(e) {
  return HtmlService.createHtmlOutput('<b>Hello world!</b>');
}