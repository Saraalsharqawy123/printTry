const { app, BrowserWindow, ipcMain,dialog } = require("electron");
const path = require("path");
const url = require("url");
let remote = require('electron').remote

let win;
function createWindow() {
  win = new BrowserWindow({ width: 1000, height: 900, 
    useContentSize: true,
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
 
  
  let printedWin = BrowserWindow.getFocusedWindow();

 
  var options = {
    silent: false,
    printBackground: true,
    color: false,
    margin: {
        marginType: 'printableArea'
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: 'Header of the Page',
    footer: 'Footer of the Page'
}

  printedWin.webContents.printToPDF(options, (success, errorType) => {
    console.log(success)
    if (!success)
     console.log(errorType)
  })

 // Use default printing options
 //printedWin.webContents.printToPDF({silent: false, deviceName: 'Microsoft Print to PDF'})
});



app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

