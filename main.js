const { ipcMain } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data/file.db');

const createWindow = () => {
  const win = new BrowserWindow({
    transparent: true,
    width: 1000,
    height: 800,
    title: 'Nofw',
    // frame: false,
    vibrancy: 'fullscreen-ui',
    backgroundMaterial: 'acrylic',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./view/index.html')
  win.webContents.openDevTools();

  
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
    db.run("INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('Setup my tusks', false, true, 0)");
    db.run("INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('Proud of yourself', false, false, 0)");
    db.run("INSERT INTO tasks (text, done, current, taskBoxId) VALUES ('Install TuskToDo', true, false, 0)");
    
  });

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