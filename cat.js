Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function getLastWeekUrl(txUrl) {
    var parts = txUrl.split("&")
    for (var idx = 0; idx < parts.length; idx++) {
        if (parts[idx].indexOf('date') >= 0) {
            var pp = parts[idx].split("=");
            if (pp.length == 2) {
                var d = pp[1];
                var oldd = new Date();
                oldd.setFullYear(d.substr(0, 4), d.substr(4, 2) - 1, d.substr(6, 2));
                oldd.setHours(d.substr(8, 2));
                oldd.setDate(oldd.getDate() - 7);
                var olddStr = oldd.Format("yyyyMMddhh");
                var parts = txUrl.split(d);
                return parts[0] + olddStr + parts[1];
            }
        }
    }
    return undefined;
}

function txToChart(txUrl, containerId) {
	var initialized = false;
	function plotChart(nameElement, datas, datasOld) {
		if (!initialized) {

        $('#' + containerId).highcharts({
            chart: {
                type: 'spline'
            },
            plotOptions: {
                spline: {
                    lineWidth: 3
                }
            },
            title: {
                text: nameElement.$.id,
                x: -20, //center
                style: { "color": "#000000", "fontSize": "12px" }
            },
            /*
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            */
            yAxis: {
                title: {
                    text: 'count'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            // tooltip: {

            // },
            // legend: {
            // layout: 'vertical',
            // align: 'top',
            // verticalAlign: 'top',
            // borderWidth: 0
            // },
            series: [{
                name: nameElement.$.id,
                data: datas,
                marker: { enabled: false },
                zones: [{
                    value: 50,
                    color: '#54ac45'
                }, {
                    value: 100,
                    color: '#e89c38'
                }, {
                    color: '#c93b3e'
                }]
            }, {
                name: nameElement.$.id + "_Last_Week",
                data: datasOld,
                marker: { enabled: false },
                dashStyle: 'ShortDash',
                color: '#cccccc'
            }]
        });
     } else {
     		$('#' + containerId).highcharts().series[0].setData(datas);
     }
	}
	
	function scheduleAjaxCall() {
    $.ajax({
            url: txUrl,
        })
        .done(function(data) {
            $.ajax({ url: getLastWeekUrl(txUrl) }).done(function(data_last_week) {
                var fs = require('fs');
                var xml2js = require('xml2js');
                // data is an XMLDocument object
                var xmlString = new XMLSerializer().serializeToString(data);
                var oldXmlsString = new XMLSerializer().serializeToString(data_last_week);

                var parser = new xml2js.Parser();
                parser.parseString(xmlString, function(err, result) {
                    var oldParser = new xml2js.Parser();
                    oldParser.parseString(oldXmlsString, function(errOld, resultOld) {
                        var nameElements = result.transaction.report[0].machine[0].type[0].name;
                        var nameElement = result.transaction.report[0].machine[0].type[0].name[0];
                        if (nameElements.length > 1 && nameElement.$.id == "All") {
                            nameElement = nameElements[1];
                        }


                        var datas = [];
                        for (var i = 0; i < 60; i++) {
                            datas[i] = parseInt(nameElement.range[i].$.avg);
                        }

                        var nameElementsOld = resultOld.transaction.report[0].machine[0].type[0].name;
                        var nameElementOld = resultOld.transaction.report[0].machine[0].type[0].name[0];
                        if (nameElementsOld.length > 1 && nameElementOld.$.id == "All") {
                            nameElementOld = nameElementsOld[1];
                        }

                        var datasOld = [];
                        for (var i = 0; i < 60; i++) {
                            datasOld[i] = parseInt(nameElementOld.range[i].$.avg);
                        }

										
                			   plotChart(nameElement, datas, datasOld);
            		});
        		});
   				});
	 			});
	 }
   scheduleAjaxCall();
      
   setInterval(scheduleAjaxCall, 30000);
}
