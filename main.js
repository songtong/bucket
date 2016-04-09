'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let dndWindow;

const ipcMain = electron.ipcMain;
ipcMain.on('something-dropped', function(event, arg) {
    mainWindow.webContents.send('something-dropped', arg);
});

function createWindow () {
    var dndWindowSize = 250;
    var screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
      
  // Create the browser window.
  mainWindow = new BrowserWindow({width: screenSize.width - dndWindowSize, height: screenSize.height, x: 0, y: 0});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  
  createDndWindow(screenSize.width - dndWindowSize, (screenSize.height - dndWindowSize) / 2, dndWindowSize);
}

function createDndWindow (x, y, dndWindowSize) {
  // Create the browser window.
  dndWindow = new BrowserWindow({
      x: Math.ceil(x), 
      y: Math.ceil(y), 
      width: dndWindowSize, 
      height: dndWindowSize, 
      alwaysOnTop: true, 
      frame: false, 
      resizable: false
    });

  // and load the index.html of the app.
  dndWindow.loadURL('file://' + __dirname + '/dnd-window.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  dndWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    dndWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
