var ipc = require("electron").ipcRenderer;
ipc.on('something-dropped', function(event, arg) {
    showResult(arg);
});

function showResult(result) {
    var p = document.createElement("div");
    p.innerText=result;
    document.body.appendChild(p);
}