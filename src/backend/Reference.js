export default class Reference {

  getDocuments() {
    const folderId = PropertiesService.getScriptProperties().getProperty('FOLDER_REFERENCE')
    const references = DriveApp.getFolderById(folderId)
    const children = references.getFiles()
    const result = []
    while(children.hasNext()) {
      const file = children.next()
      result.push({name: file.getName(), id: file.getId()})
    }
  
    return result
  }

  appendToDocument(docId, title, notes) {
    const doc = DocumentApp.openById(docId)
    const body = doc.getBody()
    body.appendParagraph(title).setHeading(DocumentApp.ParagraphHeading.HEADING2)
    body.appendParagraph('Created at: ' + new Date().toISOString())
    body.appendParagraph(notes)
  }
}