let moment = require('moment');
let Sequelize = require('sequelize');
const Op = Sequelize.Op;
let NseCM3 = require('../../nse/models/NseCM3');
let NseCD = require('../../nse/models/NseCD');
let NseFO = require('../../nse/models/NseFO');
let Utils = require('../../nse/controllers/nseUtils');
let CommonController = require('../../nse/controllers/nseCommon');
let ResponseController = require('../../nse/controllers/nseResponse');

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
                // let tradeinfo = await NseCM3.findAll({ 
                //     raw:true
                // })
                // //console.log("Trade Data from DB --------> ",tradeinfo);

                // let trade_sum = await NseCM3.findAll({
                //     attributes: [
                //         [Sequelize.literal("sum(case when bsFlg = 2 then trdQty else 0 end)"), 'TotalSell'],
                //         [Sequelize.literal("sum(case when bsFlg = 1 then trdQty else 0 end)"), 'TotalBuy'],
                //         [Sequelize.literal("sum(trdQty)"), 'TotalTrade'],
                //     ]
                //     //include: [Item]
                // });

                let [tradeinfo, trade_sum] = await Promise.all([
                    marketType.findAll({ 
                        raw:true
                    })
                    ,marketType.findAll({
                        attributes: [
                            [Sequelize.literal("sum(case when bsFlg = 2 then trdQty else 0 end)"), 'TotalSell'],
                            [Sequelize.literal("sum(case when bsFlg = 1 then trdQty else 0 end)"), 'TotalBuy'],
                            [Sequelize.literal("sum(trdQty)"), 'TotalTradeValue'],
                            [Sequelize.literal("sum(1)"), 'TotalTrade']
                        ]
                        //include: [Item]
                    })
                ]);
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
}

module.exports = SummaryTradeData;