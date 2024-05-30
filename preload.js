
const { contextBridge, ipcRenderer } = require('electron')



contextBridge.exposeInMainWorld('tasksDataController', {
  get: () => ipcRenderer.invoke( 'load_data' ),
  update: (newTasksData) => ipcRenderer.invoke( 'data_sync', newTasksData),
})

