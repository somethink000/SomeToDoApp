const { ipcMain } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./data/taskToDo.db');
const fs = require('fs');

  db.all(`SELECT id FROM tasksBoxes ORDER BY id DESC LIMIT 1`, (err, result) => {
    if(result === undefined){
      db.serialize(() => {
    
        db.run(`CREATE TABLE tasksBoxes (
          id INTEGER PRIMARY KEY,
          title TEXT NOT NULL
        )`);
  
        db.run(`CREATE TABLE tasks (
          id INTEGER PRIMARY KEY,
          text TEXT NOT NULL,
          done BIT NOT NULL,
          current BIT NOT NULL,
          taskBoxId INT NOT NULL
        )`);
      
        db.run("INSERT INTO tasksBoxes (title) VALUES ('TaskToDo')");
        db.run("INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('Setup my tusks', false, true, 1)");
        db.run("INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('Proud of yourself', false, false, 1)");
        db.run("INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('Install TuskToDo', true, false, 1)");
        
      });
    }
  });



const createWindow = () => {
  const win = new BrowserWindow({
    transparent: true,
    width: 1000,
    height: 800,
    title: 'TaskToDo',
    // frame: false,
    vibrancy: 'fullscreen-ui',
    backgroundMaterial: 'acrylic',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./view/index.html')

  ipcMain.handle('db-query', async (event, sqlQuery) => {
    return new Promise(res => {
        
        db.all(sqlQuery, (err, rows) => {
          res(rows);
        });
    });
  });
  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()

    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})