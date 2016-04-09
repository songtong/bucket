var ipc = require("electron").ipcRenderer;
var flag = true;
var containerIdx = 0;
var colors = ["yellow", "red", "blue", "orange", "green"]
ipc.on('something-dropped', function(event, data) { 	
    var type = urlType(data);
    if (type == 'cat') {
	showResult(data['text/uri-list'], type)
    } else {
	showResult(data['text/html'], type);
    }
});

function urlType(data) {
    var url = data['text/uri-list'];
    if (url.indexOf('http') == -1) {
	url = data['text/html']
    }

    if (url.indexOf("cat.ctripcorp.com") >= 0) {
        return "cat";
    } else if (url.indexOf("zabbix") >= 0) {
        return "zabbix";
    } else if (url.indexOf('meta') > 0) {
	return 'clog';	
    } else {
        return "unknown";
    }
}

function getTitle(url, type) {
    if (type == 'cat') {
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
    } else if (type == 'clog'){
    	return 'Clog';
    }
}

function getRandomColor() {
    var i = Math.random();
    i = Math.round(i * 10) % 5;
    return colors[i];
}

function showResult(result, type) {
    var ulId = flag ? "column1" : "column2";
    flag = !flag;

    var p = document.createElement("li");
    p.className += "widget color-" + getRandomColor();
    document.getElementById(ulId).appendChild(p);
    p.innerHTML = "<div class='widget-head'><h3>" + getTitle(result, type) + "</h3></div><div class = 'widget-content'> <div id='container" + containerIdx + "' style='width: 100%; height: 100%; margin: 0 auto'></div></div> ";
    if (type == 'cat') { 
	txToChart(result + "&forceDownload=xml", "container" + containerIdx);
    } else {
        subscribeClog(result, "container" + containerIdx);
    }
    containerIdx = containerIdx + 1;
}
