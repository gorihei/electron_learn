const { ipcRenderer, contextBridge } = require("electron");

// window.openDialog = () => {
//   return ipcRenderer.invoke("open-dialog");
// };

contextBridge.exposeInMainWorld("myAPI", {
  openDialog: () => ipcRenderer.invoke("open-dialog"),
});
