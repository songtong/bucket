/*
 * Extend functions onto Date & prototype, to better support date relative ops.
 * @author uknow.
 */

$.extend(Date.prototype, {
	// Format date.
	format: function(){
		var formatStr = arguments.length > 0 && arguments[0]? arguments[0]: '%y-%M-%d %H:%m:%s' ;		
		var matches = formatStr.match(/%[yMdHms]/g);
		for (var index in matches) {
			value = '';
			switch (matches[index]) {
			case '%y': value = this.getFullYear(); break;
			case '%M': value = this.getMonth() + 1; break;
			case '%d': value = this.getDate(); break;
			case '%H': value = this.getHours(); break;
			case '%m': value = this.getMinutes(); break;
			case '%s': value = this.getSeconds(); break;
			}
			formatStr = formatStr.replace(matches[index], value < 10? "0" + value: value)
		}
		return formatStr;
	},
	
	// Get max days per month.
	getMonthDays: function() {
		switch(arguments.length == 0? this.getMonth() + 1: arguments[0]) {
		case 1: case 3:case 5: case 7:case 8: case 10: case 12: return 31;
		case 4: case 6: case 9: case 11: return 30;
		case 2: if (this.getFullYear() % 4 == 0 && this.getFullYear() % 100 != 0) {
					return 29
				} else {
					return 28;
				}
		}
	},
	
	// Get date object for yesterday.
	yesterday: function() {
		var date = new Date(this.getTime());
		if (date.getDate() == 1) {
			date.setMonth(date.getMonth() - 1);
			date.setDate(date.getMonthDays());
		} else {
			date.setDate(date.getDate() - 1);
		}
		return date;
	},
	

	// Get date object for tomorrow.
	tomorrow: function() {
		var date = new Date(this.getTime());
		if (date.getDate() == date.getMonthDays()) {
			date.setMonth(date.getMonth() + 1);
			date.setDate(1);
		} else {
			date.setDate(date.getDate() + 1);
		}
		return date;
	},
	
	// Get date object for next nth day.
	nextNDay: function(days, excludesToday) {
		if (days) {
			var date = new Date(this.getTime());
			if (!excludesToday) {
				days -= 1;
			}
			for (var i = 0; i < days; i++) {
				date = date.tomorrow();
			} 
			return date;
		} else {
			console.error('days must be offered!');
		}
	},

	// Get formated date string for last n days.
	lastNDays: function(days, format, excludesToday) {
		if (days) {
			var dates = new Array();
			var date = new Date(this.getTime());
			if (!excludesToday) {
				days -= 1;
				dates.push(date.format(format? format: '%y-%M-%d'));
			}
			for (var i = 0; i < days; i++) {
				date = date.yesterday();
				dates.push(date.format(format? format: '%y-%M-%d'));
			} 
			return dates.reverse();
		} else {
			console.error('days must be offered!');
		}
	},
	
	// Get date obj for last nth day.
	lastNDay: function(days, excludesToday) {
		if (days) {
			var date = new Date(this.getTime());
			if (!excludesToday) {
				days -= 1;
			}
			for (var i = 0; i < days; i++) {
				date = date.yesterday();
			} 
			return date;
		} else {
			console.error('days must be offered!');
		}
	},
	
	// Get formatted date strings for the last whole month.
	lastMonthDays: function(format, excludesToday) {
		var dates = new Array();
		if (!excludesToday) {
			dates.push(this.format(format? format: '%y-%M-%d'));
		}
		var yesterday = this.yesterday();
		while (yesterday.getDate() != this.getDate()) {
			dates.push(yesterday.format(format? format: '%y-%M-%d'));
			yesterday = yesterday.yesterday();
		}
		return dates.reverse();
	},
	
	// Convert the day time part be number between 0 - 24.
	toDayPoint: function() {
		return Number((this.getHours() + this.getMinutes() / 60 + this.getSeconds() / 3600).toFixed(2));
	}
});

$.extend(Date, {
	// Parse day time point back to time string.
	parseDayPoint: function(dayPoint) {
		var hours = Math.floor(dayPoint);
		var seconds = Math.round((dayPoint - hours) * 3600);
		var mins = Math.floor(seconds / 60);
		seconds = seconds % 60;
		return (hours < 10? '0' + hours: hours) + ':' + (mins < 10? '0' + mins: mins) + ':' + (seconds < 10? '0' + seconds: seconds);
	}
});
