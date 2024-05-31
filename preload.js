
const { contextBridge, ipcRenderer } = require('electron')



contextBridge.exposeInMainWorld('tasksDataController', {

  taskBoxes: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes"),
  getTaskBox: ( id ) => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes WHERE id = "+id+""),
  createTaskBox: ( title, ) => ipcRenderer.invoke('db-query', "INSERT INTO tasksBoxes (title) VALUES ('"+title+"')"),
  getLastTaskBox: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes WHERE id = (SELECT MAX(id) FROM tasksBoxes)"),
  removeTaskBox: ( id ) => ipcRenderer.invoke('db-query', "DELETE FROM tasksBoxes WHERE id = "+id+""),


  tasks: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks"),
  createTask: ( text, curr, boxid ) => ipcRenderer.invoke('db-query', "INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('"+text+"', false, "+curr+", "+boxid+")"),
  getLastTask: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = (SELECT MAX(id) FROM tasks)"),
  removeTask: ( id ) => ipcRenderer.invoke('db-query', "DELETE FROM tasks WHERE id = "+id+""),
  removeTasksByBox: ( id ) => ipcRenderer.invoke('db-query', "DELETE FROM tasks WHERE taskBoxId = "+id+""),
  getTask: ( id ) => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = "+id+""),
  updateTask: ( newdata ) => ipcRenderer.invoke('db-query', "UPDATE tasks SET text = '"+newdata.text+"', done = "+newdata.done+", current = "+newdata.current+", taskBoxId = "+newdata.taskBoxId+" WHERE id = "+newdata.id+""),
  
})
