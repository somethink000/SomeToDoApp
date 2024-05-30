const { ipcMain } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')


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

  ipcMain.handle('load_data', (e) => {

    var tasksData;
    const fs = require('fs');
    const filePath = ("./data/tasksData.json");
    
    try {

      if (fs.existsSync( filePath )) {
        // tasksData = require(filePath);
        const data = fs.readFileSync(filePath);
        tasksData = JSON.parse(data);
      } else {

        tasksData = [
            {
                title : 'TaskToDo',
                tasks : [
                    {done: false, current: true, text: 'Setup my tusks'},
                    {done: false, current: false, text: 'Proud of yourself'},
                    {done: true, current: false, text: 'Install TuskToDo '},
                ]
        
            },
        ];
    
        var dictstring = JSON.stringify(tasksData);

        fs.writeFile( filePath, dictstring, function(err, result) {
            if(err) console.log('error', err);
        });
        
      }

    } catch(err) { console.log(err); }


    return tasksData;  
  
  });


  ipcMain.handle('data_sync', (e, mewdata) => {

    const fs = require('fs');
    const filePath = ("./data/tasksData.json");
    fs.writeFileSync(filePath, JSON.stringify(mewdata));
  
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