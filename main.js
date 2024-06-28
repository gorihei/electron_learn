const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    title: "マイアプリ",
    webPreferences: {
      //nodeIntegration: true, // レンダラープロセスが Node.js の機能を利用できるようにします（デフォルトは false）
      //contextIsolation: false, // メインプロセスとレンダラープロセスの JavaScript コンテキストを分離します（デフォルトは true）
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.webContents.openDevTools({ mode: "detach" });
  mainWindow.loadFile("index.html");

  ipcMain.handle("open-dialog", async (e, args) => {
    return dialog
      .showOpenDialog(mainWindow, {
        properties: ["openFile"],
      })
      .then((result) => {
        if (result.canceled) return "";
        return result.filePaths[0];
      })
      .catch((error) => console.error(error));
  });
};

app.once("ready", () => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());
