var fs = require('fs');
var homeDir = process.env["HOME"];
var profileDir = [homeDir, "Library/Application\ Support/iTerm2/DynamicProfiles"].join("/");

function showResult(result) {
    var p = document.createElement("div");
    p.innerText=result;
    document.body.appendChild(p);
}
function split(input) {
    var result = {};
    input = input.trim();

    var parts = input.split("-");
    result.start = Number(parts[0]);
    result.end = parts.length == 1 ? parts[0] : parts[1];

    return result;
}
function generate() {
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;
    var d = document.getElementById("d").value;
    var port = document.getElementById("port").value;

    var tags="";

    var envs = document.getElementsByName("env");
    for(i in envs) {
        if(envs[i].checked) {
            tags += '"' + envs[i].value + '"';
        }
    }

    var apps = document.getElementsByName("app");
    for(i in apps) {
        if(apps[i].checked) {
            tags += ',"' + apps[i].value +'"';
        }
    }

    a = split(a);
    b = split(b);
    c = split(c);
    d = split(d);

    for(i=a.start;i<=a.end;i++) {
        for(j=b.start;j<=b.end;j++) {
            for(k=c.start;k<=c.end;k++) {
                for(l=d.start;l<=d.end;l++) {
                    var ip = [i,j,k,l].join(".");
                    var profile = itermProfile(ip, port, tags);
                    showResult(profile);
                    saveProfile(ip, profile);
                }
            }
        }
    }
}
function saveProfile(fileName, profile) {
    fs.writeFile(profileDir + "/" + fileName, profile, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
function itermProfile(ip, port, tags) {
    var uuid = guid();
    return `{
    "Profiles": [
        {
            "Guid": "${uuid}",
            "Name": "${ip}",
            "Dynamic Profile Parent Name": "Parent",
            "Command" : "ssh hermesadmin@${ip} -p${port}",
            "Tags" : [
                ${tags}
            ]
        }
    ]
    }`;
}
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
