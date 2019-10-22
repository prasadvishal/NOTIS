let request = require('request');
let mysql = require('mysql');
let TokenController = require('./nseToken');

class NseUtils{
    constructor(){

    }

    getNseData(trade_type){
        // let tradeData = C.TRADE_TYPE.find( o => o.name == trade_type);
        let tradeData = C[tradeData];
        return new Promise(async (resolve, reject) => {
            let tokenController = new TokenController();
            try{
                let token = await tokenController.getToken();
                // let insertId = await this.insertReqInApiLog(tradeData.url, type);
                let nseData = await this.makeRequestForData(tradeData.url, token, insertId);
                await setNseDataInDb(nseData, tradeData.table);
                await this.insertInApiLog(tradeData.url, type);
                resolve("done");
            } catch(e){
                reject(e);
            }
        });
    }

    makeRequestForData(url, token){
        return new Promise(async (resolve, reject) => {
            let that = this;
            try{
                request.post({
                    url: `${C.NSE_HOST}${url}`,
                    method:'POST',
                    headers:{
                        'Authorization':  `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'nonce': that.utils.getNOnce()
                    },
                    body:{
                        "version": C.VERSION,
                        "data": {
                            "msgId": that.getMsgId(),
                            "dataFormat": C.DATA_FORMAT,
                            "tradesInquiry": "0,ALL,,"
                        }
                    }
                }, function(err, resp, body){

                })
            } catch(ex){
                reject(ex);
            }
        })
    }

    getMsgId(){
        //TODO make function to get msgId
        //make db to query to get todays date and count nse apis

        return '1234098392004904';
    }

    /**
     * @param url {string}: pass endpoint
     * @param type {string}: pass token for token, pass {{type}} for others
     * @param req {object}: pass post request
     * @returns {integer}: returns id of the inserted data
     */
    insertInApiLog(url, type, req){
        //
    } 


    getTodaysRequestCount(){
        //make db query here
    }
}

module.exports = NseUtils;

