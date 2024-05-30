
const { contextBridge, ipcRenderer } = require('electron')



contextBridge.exposeInMainWorld('tasksDataController', {

  taskBoxes: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes"),

  tasks: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks"),
  createTask: ( title, curr, boxid ) => ipcRenderer.invoke('db-query', "INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('"+title+"', false, "+curr+", "+boxid+")"),
  getLastTask: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = (SELECT MAX(id) FROM tasks)"),
  // getLastTask: ( id ) => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = "+id+""),
  //updateTask: ( title, done, curr, boxid,  ) => ipcRenderer.invoke('db-query', "INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('"+title+"', false, "+curr+", "+boxid+")"),
  
})
