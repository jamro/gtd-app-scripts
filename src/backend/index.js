import Inbox from './Inbox.js'
import Installer from './Installer.js'
import NextActions from './NextActions.js'
import Reference from './Reference.js'


const installer = new Installer()
const inbox = new Inbox()
const reference = new Reference()
const nextActions = new NextActions()

export {
  installer,
  inbox,
  reference,
  nextActions
}