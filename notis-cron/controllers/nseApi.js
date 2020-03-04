var CronJob = require('cron').CronJob;
var request = require('request');

var job = new CronJob('1 30 * * * *', cdFunction());


function cdFunction() {
  request({
  	url: 'http://10.201.0.11:3035/getNseUtils?trade_type=CD',
  	method: 'GET',

  }, function(er, body, res){
  	console.log(er, res,"*******************");
  })
}

cdFunction();
job.start();