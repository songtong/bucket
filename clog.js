// uknow

function subscribeClog(appId) {
	function plotChart(data) {
		// create dom.
		var $container = $('<div>');
		$container.highcharts({
			chart: {
				events: {
	            	load: function(){
	            		this.addSeries[{
	            			name: 'NotFoundException',
	            			data: [3, 4]
	            		}]
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
	        xAxis: {
	            categories: ['Success', 'Failure'],
	            crosshair: true
	        },
	        yAxis: {
	            title: {
	                text: 'Times'
	            },
		        min: 0
	        },
	        series: []
		});
	}
	
	var today = new Date();
	$.ajax({
		url: 'http://ws.logging.ctripcorp.com/exceptions/exception-list',
		dataType: 'jsonp',
		data: {
			fromDate: today.lastNDay(7),
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
