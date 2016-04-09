var ipc = require("electron").ipcRenderer;
var flag = true;
var containerIdx = 0;
var colors = ["yellow", "red", "blue", "orange", "green"]
ipc.on('something-dropped', function(event, arg) {
    var url = arg;
    showResult(arg);
    focusMainWindow();
});

function urlType(url) {
    if (url.indexOf("cat.ctripcorp.com") >= 0) {
        return "cat";
    } else if (url.indexOf("zabbix") >= 0) {
        return "zabbix";
    } else {
        return "unknown";
    }
}
const BrowserWindow = require('electron').remote.BrowserWindow;
function focusMainWindow() {
    var windows = BrowserWindow.getAllWindows();
    for(var i = 0; i < windows.length; i++) {
        if(windows[i].isResizable()) {
            windows[i].focus();
            break;
        }
    }
}
function getCatTitle(url) {
    var parts = url.split("&");
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf("domain") >= 0) {
            var pp = parts[i].split("=")
            if (pp.length == 2) {
                return "CAT " + pp[1];
            }
        }
    }
    return "CAT";
}

function getRandomColor() {
    var i = Math.random();
    i = Math.round(i * 10) % 5;
    return colors[i];
}

function showResult(result) {
    var ulId = flag ? "column1" : "column2";
    flag = !flag;

    var p = document.createElement("li");
    p.className += "widget color-" + getRandomColor();
    document.getElementById(ulId).appendChild(p);
    p.innerHTML = "<div class='widget-head'><h3>" + getCatTitle(result) + "</h3></div><div class = 'widget-content'> <div id='container" + containerIdx + "' style='width: 100%; height: 100%; margin: 0 auto'></div></div> ";
    txToChart(result + "&forceDownload=xml", "container" + containerIdx);
    iNettuts.init();
    containerIdx = containerIdx + 1;
}