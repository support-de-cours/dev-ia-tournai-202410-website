const { app, BrowserWindow } = require('electron')
const server = require('./server');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,

  })

  // win.loadFile('index.html')
  win.loadURL(`http://localhost:${server.port}`)
}

app.whenReady().then(() => {
  createWindow()
})