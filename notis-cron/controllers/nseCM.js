var CronJob = require('cron').CronJob;
var request = require('request');

var job = new CronJob('1 30 * * * *', cmFunction());


function cmFunction() {
  request({
  	url: 'http://10.201.0.11:3035/getNseUtils?trade_type=CM',
  	method: 'GET',

  }, function(er, body, res){
  	console.log(er, res,"*******************");
  })
}

cmFunction();
job.start();