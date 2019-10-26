class Utils{
    /**
     * returns true if data is '' or null or undefined
     * for object, checks if it's length is non zero or not
     * @param data {Mixed}
     * @param zeroIsNotEmpty {boolean}: pass true only if you want 0 to be considered as non-empty
     * @returns {boolean}
     */
    isEmpty(data, zeroIsNotEmpty) {
        if(typeof data !== 'object' && (data === null || data === '' || typeof data === 'undefined')) {
            return true;
        } else if(data === null) {
            return true;
        } else if(typeof data === 'string' && data === '0' && !zeroIsNotEmpty) {
            return true;
        } else if(typeof data.length !== 'undefined') {
            if(data.length > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            if(Object.keys(data).length > 0) {
                return false;
            } else if(typeof data === 'number' && (data !== 0 || zeroIsNotEmpty)) {
                return false;
            } else {
                if(data === true) {
                    return false
                }
                return true;
            }
        }
    }

    convertIn2Digits(d){
        d = d+"";
        if(d.length < 2){
            return "0"+d
        }else{
            return d
        }
    }

    get6DigitRandNo(){
        return Math.floor(100000 + Math.random() * 900000)
    }

    getNOnce(){
        let d = new Date();
        let buff = new Buffer(`${d.getFullYear()}${this.convertIn2Digits(d.getMonth()+1)}${this.convertIn2Digits(d.getDate())}${this.convertIn2Digits(d.getHours())}${this.convertIn2Digits(d.getMinutes())}${this.convertIn2Digits(d.getSeconds())}${this.convertIn2Digits(d.getMilliseconds())}:${this.get6DigitRandNo()}`);
        let base64data = buff.toString('base64');
    
        // console.log('"' + data + '" converted to Base64 is "' + base64data + '"');
        return base64data;
    }
}

module.exports = Utils;
