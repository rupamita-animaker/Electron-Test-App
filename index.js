const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
   mainWindow = new BrowserWindow({ 
        webPreferences: { 
            nodeIntegration: true, // without this being true require won't work in script.js
            contextIsolation: false 
        } 
    });
    mainWindow.webContents.openDevTools(); // open dev tools for browser window
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

/*Wait for message on channel 'video:submit'. On reception of message
execute the callback function */
ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log('video duration: ' + metadata.format.duration);
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    });
});

ipcMain.on('window:create', (event) => {
    const testWindow = new BrowserWindow({
        backgroundColor: 'pink'
    });
})