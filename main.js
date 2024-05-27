const { ipcMain } = require('electron')
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

  win.loadFile('./view/index.html')
  win.webContents.openDevTools();

  ipcMain.handle('ctrls', (e, btn) => {
    let res = { class: btn, btn: null};
    if (btn === 'close-btn') 
    {
        win.close();
    }
    // if (btn === 'min-btn') 
    // {
    //     win.minimize();
    // } else if (btn === 'max-btn') 
    // {
    //     if (!win.isMaximized()) {
    //       win.maximize();
    //       res.btn = 'MAX';
    //     } else {
    //       win.unmaximize();
    //       res.btn = 'UNMAX';
    //     }
    // } else if (btn === 'close-btn') 
    // {
    //     win.close();
    // }else if (btn === 'resize') 
    // {
    //     if (win.isMaximized()) {
    //       win.maximize();
    //       res.btn = 'MAX';
    //     } else {
    //       win.unmaximize();
    //       res.btn = 'UNMAX';
    //     }
    // }
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