const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')


const createWindow = () => {
  const win = new BrowserWindow({
    transparent: true,
    width: 800,
    height: 600,
    title: 'Nofw',
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.webContents.openDevTools();
  win.loadFile('./view/index.html')
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