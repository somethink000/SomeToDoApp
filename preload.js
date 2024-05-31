
const { contextBridge, ipcRenderer } = require('electron')



contextBridge.exposeInMainWorld('tasksDataController', {

  taskBoxes: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes"),
  getTaskBox: ( id ) => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes WHERE id = "+id+""),

  tasks: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks"),
  createTask: ( title, curr, boxid ) => ipcRenderer.invoke('db-query', "INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('"+title+"', false, "+curr+", "+boxid+")"),
  getLastTask: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = (SELECT MAX(id) FROM tasks)"),
  removeTask: ( id ) => ipcRenderer.invoke('db-query', "DELETE FROM tasks WHERE id = "+id+""),
  getTask: ( id ) => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = "+id+""),
  updateTask: ( newdata ) => ipcRenderer.invoke('db-query', "UPDATE tasks SET text = '"+newdata.text+"', done = "+newdata.done+", current = "+newdata.current+", taskBoxId = "+newdata.taskBoxId+" WHERE id = "+newdata.id+""),
  // getLastTask: ( id ) => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = "+id+""),
  //updateTask: ( title, done, curr, boxid,  ) => ipcRenderer.invoke('db-query', "INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('"+title+"', false, "+curr+", "+boxid+")"),
  
})
