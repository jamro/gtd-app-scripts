export default class Installer {

  install() {
    console.log("Installing GTD with Google App Scripts...")
    this.createTaskList("Inbox")
    this.createTaskList("Next Actions")
    const gtdFolder = this.createFolder(DriveApp.getRootFolder(), 'GTD')
    this.createFolder(gtdFolder, 'Reference')
  
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
    let taskList = Tasks.Tasklists.list().items.find(l => l.title === fullName)
    if(!taskList) {
      console.log('Creating task list: ' + fullName)
      taskList = Tasks.newTaskList()
      taskList.title = fullName
      Tasks.Tasklists.insert(taskList)
    } else {
      console.log('Task list found: ' + fullName)
    }
  
    PropertiesService.getScriptProperties().setProperty(`TASK_LIST_${name.toUpperCase().replace(' ', '_')}`, taskList.id)
    return taskList.id
  }

}
