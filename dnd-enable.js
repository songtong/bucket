var ipc = require("electron").ipcRenderer;
var flag = true;

function getImageName(url) {
    if (url == undefined) {
        console.log("v")
        return "v.png";
    }
    if (url.indexOf("cat.ctripcorp.com") >= 0) {
        console.log("c")
        return "c.png";
    } else if (url.indexOf("zabbix") >= 0) {
        console.log("z")
        return "z.png";
    } else if (url.indexOf("logging") >= 0) {
        console.log("f")
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
    // for (i in types) {
    //     console.log(types[i] + ":" + e.originalEvent.dataTransfer.getData(types[i]));
    // }

    ipc.send('something-dropped', e.originalEvent.dataTransfer.getData('text/uri-list'));
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