let Utils = require('../../../config/Utils.js');
let Constants = require('../../../config/Constants.js');

class NseResponse {
    constructor(){
        this.utils = new Utils();
    }

    async commonCheck(req, req_data, key='body') {
		if(!req_data.length) {
			return 0;
		}
		let blank_array = [];
		for(let count = 0; count < req_data.length; count++) {
			//console.log("Key",key,"Req[key] --> ",req[key],!req[key])
			if( !req[key] ||
				req[key][req_data[count]] === 'undefined'   ||
				req[key][req_data[count]] === undefined   ||
				req[key][req_data[count]] === null   ||
				(typeof req[key][req_data[count]] == 'string' && req[key][req_data[count]].trim() == "") ||
				req[key][req_data[count]] === " " || 
				req[key][req_data[count]] === "") {
				blank_array.push(req_data[count]);
			}
		}
		if(blank_array.length) {
			return blank_array.join(',');
		}
		return 0;
	}
}


module.exports = NseResponse;
