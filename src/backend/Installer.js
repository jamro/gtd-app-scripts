export default class Installer {

  install() {
    console.log("Installing GTD with Google App Scripts...")
    this.createTaskList("Inbox")
    this.createTaskList("Next Actions")
    const gtdFolder = this.createFolder(DriveApp.getRootFolder(), 'GTD')
    const refFolder = this.createFolder(gtdFolder, 'Reference')

    const children = refFolder.getFiles()
    let hasDoc = false
    while(children.hasNext()) {
      const file = children.next()
      if(file.getName() === 'My References') {
        hasDoc = true
        break;
      }
    }
    if(!hasDoc) {
      const doc = DocumentApp.create("My References")
      const file = DriveApp.getFileById(doc.getId())
      file.moveTo(refFolder)
    }
  
    return PropertiesService.getScriptProperties().getProperties()
  }

  createFolder(parent, name) {
    const subfolders = parent.getFolders()
    let requestedFolder = null
    while(subfolders.hasNext()) {
      const folder = subfolders.next()
      if(folder.getName() === name) {
        requestedFolder = folder
        break
      }
    }
    if(!requestedFolder) {
      console.log('Creating folder: ' + name)
      requestedFolder = parent.createFolder(name)
    } else {
      console.log('Folder found: ' + name)
    }
    PropertiesService.getScriptProperties().setProperty('FOLDER_' + name.toUpperCase().replace(" ", "_"), requestedFolder.getId())
    return requestedFolder
  }
  
  createTaskList(name) {
    const fullName = 'GTD / ' + name
    console.log("Reading existing lists")
    const allLists = Tasks.Tasklists.list().items
    console.log('Lists found: ' + allLists.length)
    let taskList = allLists.find(l => l.title === fullName)
    if(!taskList) {
      console.log('Creating task list: ' + fullName)
      taskList = Tasks.newTaskList()
      console.log('Setting list name')
      taskList.title = fullName
      console.log('Inserting the list')
      taskList = Tasks.Tasklists.insert(taskList)
    } else {
      console.log('Task list found: ' + fullName)
    }
    const propId = `TASK_LIST_${name.toUpperCase().replace(/ /g, '_')}`
    console.log('Storing list ID in property: ' + propId + " = " + taskList.id)
    PropertiesService.getScriptProperties().setProperty(propId, String(taskList.id))
    console.log('Task list created: ' + fullName + ", " + taskList.id)
    return taskList.id
  }

}
