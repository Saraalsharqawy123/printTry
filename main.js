const { app, BrowserWindow, ipcMain,dialog } = require("electron");
const path = require("path");
const url = require("url");

let win;
function createWindow() {
  win = new BrowserWindow({ width: 1000, height: 900, 
     webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
  } });
  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/cashier/index.html'), // compiled verion of our app
      protocol: "file:",
      slashes: true,
      autoHideMenuBar: true,
    })
  );

  
  win.setMenuBarVisibility(false)
  win.removeMenu()
  
  // The following is optional and will open the DevTools:
  win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
    app.quit();
  });
}


ipcMain.on('close', () => {
 
  
  dialog.showErrorBox('Title', 'yees print') 
  let printedWin=BrowserWindow.getFocusedWindow();

 
 // Use default printing options
      printedWin.webContents.print({ silent: false },(status,f)=>{
  
        dialog.showErrorBox('s', status) 
        dialog.showErrorBox('f', f) 
   });    
});



app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

