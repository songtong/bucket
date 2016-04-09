// uknow

function subscribeClog(url, containerId) {
	function plotChart(data) {
		// create dom.
		var $container = $('<div>');
            /*   $('#' + containerId).highcharts({
                    title: {
                        text: 'Exception Count',
                        x: -20 //center
                    },
                    subtitle: {
                        text: '',
                        x: -20
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yAxis: {
                        title: {
                            text: 'Count'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: 'Times'
                    },
                    // legend: {
                        // layout: 'vertical',
                        // align: 'top',
                        // verticalAlign: 'top',
                        // borderWidth: 0
                    // },
                    series: data
                });
*/

	var xx = [{name: "huazai", data: data.map(function(input){return input.count;})}];
	var categories = data.map(function(input){return input.name;});
	
	

		$('#' + containerId).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Xxxxxx'
        },
        subtitle: {
            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">CLOG</a>'
        },
        xAxis: {
            categories: categories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Exception Count',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
			enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:  '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: xx
    });

	}
	
	var today = new Date();
	$.ajax({
		url: 'http://ws.logging.ctripcorp.com/exceptions/exception-list',
		dataType: 'json',
		data: {
			fromDate: today.lastNDay(7).format(),
			toDate: today.format(),
			appId: 922201
		},
		success: function(data) {
			plotChart(data); 
		},
		error: function() {
			console.log('error');
		}
	});
}

