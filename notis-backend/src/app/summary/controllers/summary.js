let moment = require('moment');
let Sequelize = require('sequelize');
const Op = Sequelize.Op;
let NseCM3 = require('../../nse/models/NseCM3');
let NseCD = require('../../nse/models/NseCD');
let NseFO = require('../../nse/models/NseFO');
let Utils = require('../../nse/controllers/nseUtils');
let CommonController = require('../../nse/controllers/nseCommon');
let ResponseController = require('../../nse/controllers/nseResponse');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class SummaryTradeData{
    constructor(){
        this.utils = new Utils();
        this.CommonController = new CommonController();
        this.ResponseController = new ResponseController();
    }

    getTradeData(reqdata){
        return new Promise(async (resolve, reject) => {
            // let tokenController = new TokenController();
            try{
            	let commoncheck = this.CommonController.commonCheck(reqdata, ['marketType'], 'body');
                console.log("Common Check ----> ",commoncheck);
                if(commoncheck && commoncheck.length){
                    return resolve(this.ResponseController.badRequestErrorResponse(commoncheck))
                }
                let marketType = null;
                switch(reqdata.body.marketType){
                    case 'CM' : 
                        marketType = NseCM3;
                        break;
                    case 'CD' : 
                        marketType = NseCD;
                        break;
                    case 'FO' :
                        marketType = NseFO;
                        break;
                }
                let findPromise = marketType.findAll({ 
                    raw:true
                });

                let countPromise =  marketType.findAll({
                    attributes: [
                        [Sequelize.literal("sum(case when bsFlg = 2 then trdQty else 0 end)"), 'TotalSell'],
                        [Sequelize.literal("sum(case when bsFlg = 1 then trdQty else 0 end)"), 'TotalBuy'],
                        [Sequelize.literal("sum(trdQty)"), 'TotalTradeValue'],
                        [Sequelize.literal("sum(1)"), 'TotalTrade']
                    ]
                })
                if(reqdata.body.filters){
                    console.log("1. Received Filters --------------------->>>>> ",reqdata.body.filters)
                    if(reqdata.body.filters.tradeType == 'buy'){
                        reqdata.body.filters['bsFlg'] = 2;
                    }
                    else if(reqdata.body.filters.tradeType == 'sell'){
                        reqdata.body.filters['bsFlg'] = 1;
                    }

                    if(reqdata.body.filters.startNoFilter && !reqdata.body.filters.endNoFilter){
                        if(!isNaN(parseInt(reqdata.body.filters.startNoFilter))){
                           reqdata.body.filters['trdNo'] = {
                                [Op.gte] : parseInt(reqdata.body.filters.startNoFilter)
                           } 
                        }
                        delete reqdata.body.filters.startNoFilter;

                    }
                    else if(reqdata.body.filters.endNoFilter && !reqdata.body.filters.startNoFilter){
                        if(!isNaN(parseInt(reqdata.body.filters.endNoFilter))){
                           reqdata.body.filters['trdNo'] = {
                                [Op.lte] : parseInt(reqdata.body.filters.endNoFilter)
                           } 
                        }
                        delete reqdata.body.filters.endNoFilter;

                    }

                    else if(reqdata.body.filters.endNoFilter && reqdata.body.filters.startNoFilter){
                        if(!isNaN(parseInt(reqdata.body.filters.endNoFilter)) && !isNaN(parseInt(reqdata.body.filters.startNoFilter))){
                           reqdata.body.filters['trdNo'] = {
                               [Op.between] : [parseInt(reqdata.body.filters.startNoFilter),parseInt(reqdata.body.filters.endNoFilter)]
                           } 
                        }
                        delete reqdata.body.filters.endNoFilter;
                        delete reqdata.body.filters.startNoFilter;

                    }
                    delete reqdata.body.filters.tradeType;
                    console.log("2. Processed Filters --------------------->>>>> ",reqdata.body.filters)

                    findPromise = marketType.findAll({ 
                        where: reqdata.body.filters,
                        
                    });
                    
                    countPromise =  marketType.findAll({
                        attributes: [
                            [Sequelize.literal("sum(case when bsFlg = 2 then trdQty else 0 end)"), 'TotalSell'],
                            [Sequelize.literal("sum(case when bsFlg = 1 then trdQty else 0 end)"), 'TotalBuy'],
                            [Sequelize.literal("sum(trdQty)"), 'TotalTradeValue'],
                            [Sequelize.literal("sum(1)"), 'TotalTrade']
                        ],
                        where: reqdata.body.filters
                    })
                    
                    /*
                    branchIdFilter: "1"
                    cliAccountFilter: "90167"
                    endNoFilter: "987654"
                    fileName: "sdfghgtryu"
                    filePath: "2345678dfghjk"
                    includeDateInFilename: "1"
                    marketTypeFilter: "Spot"
                    startNoFilter: "2345678"
                    symbolFilter: "N"
                    timmerCheck: "1"
                    tradeTypeFilter: "buy"
                    userFilter: "44215"
                    */
                    
                }

                let [tradeinfo, trade_sum] = await Promise.all([findPromise,countPromise]);
                console.log("Sum ----> ",trade_sum[0].dataValues.TotalSell,trade_sum[0].dataValues.TotalBuy,trade_sum[0].dataValues.TotalTrade);
                let responseObj = {
                    'TradeData': tradeinfo,
                    'TotalBuy': trade_sum[0].dataValues.TotalBuy ? trade_sum[0].dataValues.TotalBuy : 0,
                    'TotalSell': trade_sum[0].dataValues.TotalSell ? trade_sum[0].dataValues.TotalSell : 0,
                    'TotalTradeValue': trade_sum[0].dataValues.TotalTradeValue ?  trade_sum[0].dataValues.TotalTradeValue : 0,
                    'TotalTrade': trade_sum[0].dataValues.TotalTrade ?  trade_sum[0].dataValues.TotalTrade : 0
                }
				return resolve(this.ResponseController.successResponse(responseObj));
                //resolve("done");
            } catch(e){
                reject(e);
            }
        });
    }

    getTradeDataBackup(reqdata){
        return new Promise(async (resolve, reject) => {
            // let tokenController = new TokenController();
            try{
                let commoncheck = this.CommonController.commonCheck(reqdata, ['marketType'], 'body');
                console.log("Common Check ----> ",commoncheck);
                if(commoncheck && commoncheck.length){
                    return resolve(this.ResponseController.badRequestErrorResponse(commoncheck))
                }
                let marketType = null;
                switch(reqdata.body.marketType){
                    case 'CM' : 
                        marketType = NseCM3;
                        break;
                    case 'CD' : 
                        marketType = NseCD;
                        break;
                    case 'FO' :
                        marketType = NseFO;
                        break;
                }
                let findPromise = marketType.findAll({ 
                    raw:true
                });

                let fileName = `trade_backup_${new Date().getTime()}.csv`;
                let filePath = "tmp\ ";
                if(reqdata.body.filters){
                    console.log("1. Received Filters --------------------->>>>> ",reqdata.body.filters)
                    if(reqdata.body.filters.fileName){
                        fileName = `${reqdata.body.filters.fileName}_${reqdata.body.filters.includeDateInFilename ? new Date() : ''}.csv`;
                    }        
                    if(reqdata.body.filters.filePath){
                        filePath = reqdata.body.filters.filePath
                    }                    
                    // if(reqdata.body.filters.includeDateInFilename){

                    // }                    
                    // if(reqdata.body.filters.fileName){

                    // }
                    delete reqdata.body.filters.fileName;
                    delete reqdata.body.filters.filePath;
                    delete reqdata.body.filters.includeDateInFilename;

                    if(reqdata.body.filters.tradeType == 'buy'){
                        reqdata.body.filters['bsFlg'] = 2;
                    }
                    else if(reqdata.body.filters.tradeType == 'sell'){
                        reqdata.body.filters['bsFlg'] = 1;
                    }

                    if(reqdata.body.filters.startNoFilter && !reqdata.body.filters.endNoFilter){
                        if(!isNaN(parseInt(reqdata.body.filters.startNoFilter))){
                           reqdata.body.filters['trdNo'] = {
                                [Op.gte] : parseInt(reqdata.body.filters.startNoFilter)
                           } 
                        }
                        delete reqdata.body.filters.startNoFilter;

                    }
                    else if(reqdata.body.filters.endNoFilter && !reqdata.body.filters.startNoFilter){
                        if(!isNaN(parseInt(reqdata.body.filters.endNoFilter))){
                           reqdata.body.filters['trdNo'] = {
                                [Op.lte] : parseInt(reqdata.body.filters.endNoFilter)
                           } 
                        }
                        delete reqdata.body.filters.endNoFilter;

                    }

                    else if(reqdata.body.filters.endNoFilter && reqdata.body.filters.startNoFilter){
                        if(!isNaN(parseInt(reqdata.body.filters.endNoFilter)) && !isNaN(parseInt(reqdata.body.filters.startNoFilter))){
                           reqdata.body.filters['trdNo'] = {
                               [Op.between] : [parseInt(reqdata.body.filters.startNoFilter),parseInt(reqdata.body.filters.endNoFilter)]
                           } 
                        }
                        delete reqdata.body.filters.endNoFilter;
                        delete reqdata.body.filters.startNoFilter;

                    }
                    delete reqdata.body.filters.tradeType;
                    console.log("2. Processed Filters --------------------->>>>> ",reqdata.body.filters)

                    findPromise = marketType.findAll({ 
                        where: reqdata.body.filters,
                        
                    });
                    
                    
                    /*
                    branchIdFilter: "1"
                    cliAccountFilter: "90167"
                    endNoFilter: "987654"
                    fileName: "sdfghgtryu"
                    filePath: "2345678dfghjk"
                    includeDateInFilename: "1"
                    marketTypeFilter: "Spot"
                    startNoFilter: "2345678"
                    symbolFilter: "N"
                    timmerCheck: "1"
                    tradeTypeFilter: "buy"
                    userFilter: "44215"
                    */
                    
                }

                let [tradeinfo] = await Promise.all([findPromise]);
                console.log("Trade Data ----> ",tradeinfo);
                const csvWriter = createCsvWriter({
                  path: '/tmp/trade_backup.csv',
                  header: [
                  {"title":"Trade No.",
                   "id": "trdNo"
                  },
                  {"title":"Trade Status",
                   "id":"TCd"
                  },
                  {"title":"Symbol",
                   "id":"sym"
                  },
                  {"title":"Series",
                   "id":"ser"
                  },
                  {"title":"Instrument Type",
                   "id":"inst"
                  },
                  {"title":"Book Type",
                   "id": "mktTyp"
                  },
                  {"title":"Market Type",
                   "id": "mkt"
                  },
                  {"title":"User Id",
                   "id":"usrId"
                  },
                  {"title":"Branch Id",
                   "id":"brnCd"
                  },
                  {"title":"Buy / Sell Indicator",
                   "id":"bsFlg"
                  },
                  {"title":"Trade Qty",
                   "id":"trdQty"
                  },
                  {"title":"Trade Price",
                   "id": "trdPrc"
                  },
                  {"title":"Pro/Cli",
                   "id": "proCli"
                  },
                  {"title":"Client A/c",
                   "id": "cliActNo"
                  },
                  {"title":"Participant code",
                   "id": "cpCd"
                  },
                  {"title":"Auction Part Type",
                   "id": "actTyp"
                  },
                  {"title":"Auction No",
                   "id": "aucNo"
                  },
                  {"title":"Trade Enrty Date / Time",
                   "id": "trdTm"
                  },
                  {"title":"Trade Modified Date / Time",
                   "id":"trdTm"
                  },
                  {"title":"Order Number",
                   "id":"ordNo"
                  },
                  {"title":"Counter Party Id",
                   "id": "oppBrokerCd"
                  },
                  {"title":"Order Entry Date / Time",
                   "id": "ordTm"
                  }
                  ]
                });

                csvWriter
                  .writeRecords(tradeinfo)
                  .then(function(){
                     console.log("CSV written Successfully.");
                     const file = `/tmp/trade_backup.csv`;
                    return resolve({'file':file,'fileName':fileName});
                  });
                //resolve("done");
            } catch(e){
                reject(e);
            }
        });
    }
}

module.exports = SummaryTradeData;