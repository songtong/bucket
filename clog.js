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
		$('#' + containerId).highcharts({
			chart: {
				events: {
					load: function(){
						//this.addSeries[{
						//	name: 'NotFoundException',
						//	y: 3
						//}, {
						//	name: 'NullPointerException',
						//	y: 4
						//}]
					}
				}
			},
		title: {
	            text: 'Excetions Count'
	        },
	        plotOptions: {
	        	column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        xAxis:{
	            type: 'Excetion',
	            crosshair: true
	        },
	        yAxis: {
	            title: {
	                text: 'Count'
	            },
		    min: 0
	        },
	        series: [{name: "a", y: 23}]
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

