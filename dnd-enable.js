var ipc = require("electron").ipcRenderer;
        
$(document).on('dragenter dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
});
 
$(document).on('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    var types = e.originalEvent.dataTransfer.types;
    for(i in types) {
        console.log(types[i] + ":" + e.originalEvent.dataTransfer.getData(types[i]));
    }
    
    ipc.send('something-dropped', e.originalEvent.dataTransfer.getData('text/uri-list'));
});

