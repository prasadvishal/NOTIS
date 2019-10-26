let request = require('request');
let mysql = require('mysql');
let TokenController = require('./nseToken');
let Utils = require('../../../config/Utils.js');

class NseUtils{
    constructor(){
        this.utils = new Utils();

    }

    getNseData(trade_type){
        // let tradeData = C.TRADE_TYPE.find( o => o.name == trade_type);
        let tradeData = C[trade_type];
        return new Promise(async (resolve, reject) => {
            let tokenController = new TokenController();
            try{
                let token = await tokenController.getToken();
                console.log(token);
                // let insertId = await this.insertReqInApiLog(tradeData.url, type);
                let nseData = await this.makeRequestForData(tradeData.url, token);
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
            let body = {
                "msgId": that.getMsgId(),
                "dataFormat": C.DATA_FORMAT,
                "tradesInquiry": "0,ALL,,"
            }
            body = JSON.stringify(body);
            console.log("${C.NSE_HOST}${url}", `${C.NSE_HOST}${url}`, body);
            try{
                request({
                    url: `${C.NSE_HOST}${url}`,
                    method:'POST',
                    headers:{
                        'Authorization':  `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'nonce': that.utils.getNOnce()
                    },
                    json: true,
                    body: body
                }, function(err, resp, body){
                    console.log("***********", err, body)
                    resolve(body);
                })
            } catch(ex){
                console.log("ex========>>", ex);
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

