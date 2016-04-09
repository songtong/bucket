function addZabixGraph(url, containerId, width, height) {
    // ?graphid=12148850
    var graphid = url.substring(url.indexOf("?"), url.indexOf("&"));
    
    // strip https, use http, ://zabbixdb.sh.ctripcorp.com/
    var zabbixServer = url.substring(5, url.indexOf("/", 10));
    
    var targetUrl = `http${zabbixServer}/chart2.php${graphid}&width=${width}&height=${height}&period=42300&stime=20170409103228`;
    
    //var fake = "http://zabbixdb.sh.ctripcorp.com/chart2.php?graphid=12148850&width=500&height=100&period=42300&stime=20170409103228";
    document.getElementById(containerId).innerHTML = `<img src='${targetUrl}' width='100%' height='100%' style='margin: 0 0; padding: 0 0;'>`;
}

//dropped url https://zabbixdb.sh.ctripcorp.com/charts.php?graphid=12148850&period=3600&stime=20160409165845&sid=99a1cc560e1dc2e1
//target url  http://zabbixdb.sh.ctripcorp.com/chart2.php?graphid=12148850&width=500&height=100&period=42300&stime=20170409103228