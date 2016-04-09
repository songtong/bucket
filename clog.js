// uknow

function subscribeClog(url, containerId) {
	function plotChart(data) {
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
	//var splits = $(url).eq(1).text().split(' ');
	//var appId = splits[0];

	var series= [{name: "huazai", data: data.map(function(input){return input.count;})}];
	var categories = data.map(function(input){return input.name;});
	
	

	$('#' + containerId).highcharts({
		chart: {
		    type: 'bar'
		},
		title: {
		    text: 'Exception Count'
		},
		subtitle: {
		    text: 'Source: <a href="http://logging.ctripcorp.com">CLOG</a>'
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
		series: series
	    });

	}
	
	var splits = $(url).eq(1).text().split(' ');
	var appId = splits[0];
	
	var today = new Date();
	$.ajax({
		url: 'http://ws.logging.ctripcorp.com/exceptions/exception-list',
		dataType: 'json',
		data: {
			fromDate: today.lastNDay(7).format(),
			toDate: today.format(),
			appId: appId
		},
		success: function(data) {
			plotChart(data); 
		},
		error: function() {
			console.log('error');
		}
	});
}

