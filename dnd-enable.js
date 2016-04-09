var ipc = require("electron").ipcRenderer;
var flag = true;

function getImageName(url) {
    if (url == undefined) {
        return "v.png";
    }
    if (url.indexOf("cat.ctripcorp.com") >= 0) {
        return "c.png";
    } else if (url.indexOf("zabbix") >= 0) {
        return "zz.png";
    } else if (url.indexOf("about:blank") >= 0) {
        return "f.png";
    } else {
        return "v.png";
    }
}

$(document).on('dragenter dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (flag) {
        var url = e.originalEvent.dataTransfer.getData('text/uri-list');
        var imageName = getImageName(url);
        flag = false;
        document.body.style.backgroundImage = "url('" + imageName + "')";
    }
});

$(document).on('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var types = e.originalEvent.dataTransfer.types;
    var data = {};
    for(i in types) {
        console.log(types[i] + ":" + e.originalEvent.dataTransfer.getData(types[i]));
   	data[types[i]] = e.originalEvent.dataTransfer.getData(types[i]);
    }
    
    ipc.send('something-dropped', data);

    if (!flag) {
        flag = true;
    }

    document.body.style.backgroundImage = "url('v.png')";
});

$(document).on('dragexit dragleave', function(e) {
    if (!flag) {
        flag = true;
    }
    document.body.style.backgroundImage = "url('v.png')";
});