let request = require('request');
// let nonce = require('nonce')();

// console.log(nonce())
var NseController ={};

NseController.getToken = function(req, res) {
    try {
    	request({
    	    url:'https://www.devconnect2nse.com/token',
    	    method:'POST',
    	    headers:{
    	        'Authorization': 'Basic MDZiZTczNGVjYWYzNGQ3MDgxZTE5YWI1Zjk0OTBiZGM6ODI2MDMxM2FmMTYzNDFiNGJjOWI4N2JkNGQ2YWVjMmE=',
    	        'Content-Type': 'application/x-www-form-urlencoded',
    	        'nonce': getNOnce()
    	    },
    	    form: {'grant_type': 'client_credentials'}
    	}, function(er, resp, body){
    	    console.log("token API response -------> ",er, body);
            console.log("token API Request -------> ",req);
    	    res.send({"err":er,"body":body})
    	})
    } catch (err) {
        console.error("Tracko Error Caught ---------->  ", err);
        res.send({"error":err})
    }
}




module.exports = NseController;

function convertIn2Digits(d){
    d = d+"";
    if(d.length < 2){
        return "0"+d
    }else{
        return d
    }
}

function getNOnce(){
    let d = new Date();
    let buff = new Buffer(`${d.getFullYear()}${convertIn2Digits(d.getMonth()+1)}${convertIn2Digits(d.getDate())}${convertIn2Digits(d.getHours())}${convertIn2Digits(d.getMinutes())}${convertIn2Digits(d.getSeconds())}${convertIn2Digits(d.getMilliseconds())}:${get6DigitRandNo()}`);
    let base64data = buff.toString('base64');

    console.log('"' + data + '" converted to Base64 is "' + base64data + '"');
    return base64data;
}

function get6DigitRandNo(){
    return Math.floor(100000 + Math.random() * 900000)
}