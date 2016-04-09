var ipc = require("electron").ipcRenderer;
ipc.on('something-dropped', function(event, arg) {
    var url = arg;
    showResult(arg);
});

function urlType(url) {
    if(url.indexOf("cat.ctripcorp.com") >= 0) {
        return "cat";
    } else if(url.indexOf("zabbix") >= 0) {
        return "zabbix";
    } else {
        return "unknown";
    }
}

function showResult(result) {
    
    
    
    var p = document.createElement("div");
    p.innerText = result;
    document.body.appendChild(p);
}