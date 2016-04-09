var fs = require('fs');

function writeConfig(config) {
    var jsonString = JSON.stringify(config);
    fs.writeFile(__dirname + "/hackathon.json", jsonString, function (err) {
        if (err) {
            return console.log("save config failed " + err);
        }
        console.log("config saved! " + jsonString);
    });
}

function readConfig(callback) {
    fs.readFile(__dirname + "/hackathon.json", 'utf8', function (err, data) {
        if (err) {
            return console.log("read config failed " + err);
        }
        callback(JSON.parse(data));
    });
}
