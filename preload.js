
const { contextBridge, ipcRenderer } = require('electron')



contextBridge.exposeInMainWorld('tasksDataController', {
  getTasksData: () => ipcRenderer.invoke( 'load_data' ),
})

