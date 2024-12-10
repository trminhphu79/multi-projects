const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function createrWindow() {
  win = new BrowserWindow({ width: 1440, height: 920 });
  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        'dist/index.html'
      ),
      protocol: 'file:',
      slashes: true,
    })
  );
}

app.on('ready', createrWindow);
