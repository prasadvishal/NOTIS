let Utils = require('../../../config/Utils.js');
let Constants = require('../../../config/Constants.js');

class NseResponse {
    constructor(){
        this.utils = new Utils();
    }

    commonCheck(req, req_data, key='body') {
		if(!req_data.length) {
			return 0;
		}
		let blank_array = [];
		req_data.forEach(function(el){
			console.log("Key",key,"Req[key] --> ",req[key],!req[key],el,req[key][el])
			if( !req[key] ||
				req[key][el] === 'undefined'   ||
				req[key][el] === undefined   ||
				req[key][el] === null   ||
				(typeof req[key][el] == 'string' && req[key][el].trim() == "") ||
				req[key][el] === " " || 
				req[key][el] === "") {
				blank_array.push(el);
			}
		})

		if(blank_array.length) {
			return blank_array.join(',');
		}
		return 0;
	}
}


module.exports = NseResponse;
