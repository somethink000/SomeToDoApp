
const { contextBridge, ipcRenderer } = require('electron')



contextBridge.exposeInMainWorld('tasksDataController', {

  taskBoxes: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes"),
  getTaskBox: (id) => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes WHERE id = " + id + ""),
  createTaskBox: (title, sortId) => ipcRenderer.invoke('db-query', "INSERT INTO tasksBoxes (title, sortId) VALUES ('" + title + "', " + sortId + " )"),
  getLastTaskBox: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasksBoxes WHERE id = (SELECT MAX(id) FROM tasksBoxes)"),
  removeTaskBox: (id) => ipcRenderer.invoke('db-query', "DELETE FROM tasksBoxes WHERE id = " + id + ""),
  updateTaskBoxSort: (id, sortId) => ipcRenderer.invoke('db-query', "UPDATE tasksBoxes SET sortId = '" + sortId + "' WHERE id = " + id + ""),

  tasks: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks"),
  tasksByBlock: (blockId) => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE taskBoxId = " + blockId + ""),
  createTask: (text, curr, boxid) => ipcRenderer.invoke('db-query', "INSERT INTO tasks (text, done, current, taskBoxId, sortId) VALUES ('" + text + "', false, " + curr + ", " + boxid + ", 0)"),
  getLastTask: () => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = (SELECT MAX(id) FROM tasks)"),
  removeTask: (id) => ipcRenderer.invoke('db-query', "DELETE FROM tasks WHERE id = " + id + ""),
  removeTasksByBox: (id) => ipcRenderer.invoke('db-query', "DELETE FROM tasks WHERE taskBoxId = " + id + ""),
  getTask: (id) => ipcRenderer.invoke('db-query', "SELECT * FROM tasks WHERE id = " + id + ""),
  updateTask: (newdata) => ipcRenderer.invoke('db-query', "UPDATE tasks SET text = '" + newdata.text + "', done = " + newdata.done + ", current = " + newdata.current + ", taskBoxId = " + newdata.taskBoxId + " WHERE id = " + newdata.id + ""),
  updateTaskSort: (id, sortId) => ipcRenderer.invoke('db-query', "UPDATE tasks SET sortId = '" + sortId + "' WHERE id = " + id + ""),

})
