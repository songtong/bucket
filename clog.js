// uknow

function subscribeClog(url, containerId) {
	var $container = $('#' + containerId);
	var doneInitialization = false;
	
	function plotChart(data) {
		if (doneInitialization) {
			var sery =  data.map(function(input){return input.count;});
			$container.highcharts().series[0].setData(sery);
		} else {
			var series= [{name: "huazai", data: data.map(function(input){return input.count;})}];
			var categories = data.map(function(input){return input.name;});
			$chart = $container.highcharts({
				chart: {
				    type: 'bar',
				    events: {
				    	load: function() {
				    		doneInitialization = true;
				    	}
				    }
				},
				title: {
				    text: 'Exception Count',
					style: { "color": "#000000", "fontSize": "12px" }
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
		
	}
	
	var splits = $(url).eq(1).text().split(' ');
	var appId = splits[0];
	
	var today = new Date();
	
	function scheduleAjaxCall() {
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
	
	scheduleAjaxCall();
	setInterval(scheduleAjaxCall, 30000);
	/*	
	$container.parents('.widget').find('.widget-head .btn').on('click', function(e){
		e.preventDefault();
		e.stopPropagation();
		var $target = $(e.target);
		if ($target.hasClass('active')) {
			$target.removeClass('active');
			clearInterval($target.data('handler'));
		} else {
			$target.addClass('active');
			handler = setInterval(scheduleAjaxCall, 2000);
			$target.data('handler', handler);
		}
	});
	*/
}

