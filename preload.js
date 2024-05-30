
const { contextBridge, ipcRenderer } = require('electron')



contextBridge.exposeInMainWorld('tasksDataController', {

  taskBoxes: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes"),

  tasks: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks"),


})
