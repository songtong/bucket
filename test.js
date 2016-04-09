const http = require('http')
const cheerio = require('cheerio')

var content = '';
var request = http.get('http://logging.ctripcorp.com', (res) => {
	console.log(`Got response: ${res.statusCode}`);
	console.log(res.headers);
	// consume response body
	var length  = 0;
	res.on('data', function(data) {
		content += data;
		
	}).on('end', function(){
		var $content = cheerio.load(content);
		var body = $content('#form');
		console.log(body.toString());
		//console.log('close');
	});

}).on('error', (e) => {
	console.log(`Got error: ${e.message}`);
});

request.end();
