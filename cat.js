function txToChart(txUrl, containerId) {
    $.ajax({
            url: txUrl,
        })
        .done(function(data) {
            var fs = require('fs');
            var xml2js = require('xml2js');
            // data is an XMLDocument object
            var xmlString = new XMLSerializer().serializeToString(data);

            var parser = new xml2js.Parser();
            parser.parseString(xmlString, function(err, result) {
                var nameElement = result.transaction.report[0].machine[0].type[0].name[0];

                var datas = [];
                for (var i = 0; i < 60; i++) {
                    datas[i] = parseInt(nameElement.range[i].$.avg);
                }


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
                        x: -20 //center
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
                    }]
                });
            });
        });
}
