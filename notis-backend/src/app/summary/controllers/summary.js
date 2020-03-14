let moment = require('moment');
let Sequelize = require('sequelize');
const Op = Sequelize.Op;
let NseCM3 = require('../../nse/models/NseCM3');
let NseCD = require('../../nse/models/NseCD');
let NseFO = require('../../nse/models/NseFO');
let CDContract = require('../../nse/models/CDContract');
let CMSecurity = require('../../nse/models/CMSecurity');
let FOContract = require('../../nse/models/FOContract');
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
              console.log("Inside getTradeData()")
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
                let findPromise = null;
                let countPromise = null;
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
                        attributes: [['id', 'ID'],['trdNo','Trade Number'],['ordNo','Order Number'],['mkt','Market Type'], ['proCli', 'PRO/CLI'], ['cliActNo', 'Account No.'], ['cpCd', 'CP Code'], ['security', 'Security Name'],['sym','Symbol'],['ser','Series'],['bsFlg', 'Buy/Sell'],['trdQty', 'Trade Qty'],['trdPrc','Trade Price'],['createdAt', 'Date & Time']], 
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

                }else{
                  findPromise = marketType.findAll({ 
                      attributes: [['id', 'ID'],['trdNo','Trade Number'],['ordNo','Order Number'],['mkt','Market Type'], ['proCli', 'PRO/CLI'], ['cliActNo', 'Account No.'], ['cpCd', 'CP Code'], ['security', 'Security Name'],['sym','Symbol'],['ser','Series'],['bsFlg', 'Buy/Sell'],['trdQty', 'Trade Qty'],['trdPrc','Trade Price'],['createdAt', 'Date & Time']], 
                      raw:true
                  });

                  countPromise =  marketType.findAll({
                      attributes: [
                          [Sequelize.literal("sum(case when bsFlg = 2 then trdQty else 0 end)"), 'TotalSell'],
                          [Sequelize.literal("sum(case when bsFlg = 1 then trdQty else 0 end)"), 'TotalBuy'],
                          [Sequelize.literal("sum(trdQty)"), 'TotalTradeValue'],
                          [Sequelize.literal("sum(1)"), 'TotalTrade']
                      ]
                  })
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
                let that = this;
                console.log("Common Check ----> ",commoncheck);
                if(commoncheck && commoncheck.length){
                    return resolve(this.ResponseController.badRequestErrorResponse(commoncheck))
                }
                console.log("Current User ----> ",reqdata.user);
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

                let fileName = `trade_backup_${new Date().getTime()}.csv`;
                let filePath = `/root/notis-databackup/trade-data/`;
                let findPromise = null;
                if(reqdata.body.filters){
                    console.log("1. Received Filters --------------------->>>>> ",reqdata.body.filters)
                    if(reqdata.body.filters.fileName){
                        fileName = `${reqdata.body.filters.fileName}${reqdata.body.filters.includeDateInFilename ? '_'+moment().format(): ''}.csv`;
                        delete reqdata.body.filters.fileName;
                    }                    
                    if(reqdata.body.filters.includeDateInFilename){
                      delete reqdata.body.filters.includeDateInFilename;
                    }                    
                    if(reqdata.body.filters.filePath){
                      delete reqdata.body.filters.filePath;
                    }

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
                    
                }else{

                  findPromise = marketType.findAll({ 
                      raw:true
                  });
                }

                let [tradeinfo] = await Promise.all([findPromise]);
                console.log("Trade Data ----> ",tradeinfo);

                if(reqdata.body.marketType == 'CM'){
                  tradeinfo.map(item => {
                    item['settPeriod'] = 7;
                    item['trdTm'] = moment(item['trdTm']).format('MM/DD/YY hh:mm:ss');
                    item['ordTm'] = moment(item['ordTm']).format('MM/DD/YY hh:mm:ss');
                    item['oppBrokerCd'] = item['oppBrokerCd'] ? item['oppBrokerCd'] : 'Nil';
                  })
                  const csvWriter = createCsvWriter({
                    path: `${filePath}${fileName}`,
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
                    {"title":"Security Name",
                     "id":"secName"
                    },
                    {"title":"Instrument Type",
                     "id":"inst"
                    },
                    {"title":"Book Type",
                     "id": "mktTyp"
                    },
                    {"title":"Market Type",
                     "id": "mktTyp"
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
                     "id": "stpTyp"
                    },
                    {"title":"Auction No",
                     "id": "aucNo"
                    },
                    {"title":"Sett Period",
                     "id": "settPeriod"
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
                       const file = `${filePath}${fileName}`;
                       
                       let emailer = require('nodemailer');
                       let transport = emailer.createTransport({
                         service: 'gmail',
                         auth: {
                           user: 'help.notisapp@gmail.com',
                           pass: 'notis@123'
                         },
                          tls: {
                              rejectUnauthorized: false
                          }
                       });

                       if(reqdata.user.user_email){
                        let maildata= {
                          from: 'help.notisapp@gmail.com',
                          to: reqdata.user.user_email,
                          cc: ['vishuthedj@gmail.com'],
                          subject: `Trade Data Backup | ${fileName} | ${new Date()}`,
                          text: 
                          `Hi, 
                          Please find Trade backup file in the attachment section.

                          Regards
                          Team Notis App
                          `,
                          attachments: [
                              {
                                 path:  `${filePath}${fileName}` //pathOfTheAttachmet
                              }
                            ]
                        };
                        transport.sendMail(maildata, function(error, a){
                           if (error) {
                             console.log("Error in sending mail ---> ",error);
                             return resolve(that.ResponseController.successResponse(null,'Backup Successfull, Unable to Mail Backup File, File stored on Server.'));

                           } else {
                             console.log("Mail Sent ---> ",a);
                             return resolve(that.ResponseController.successResponse(null,'Backup Successfull, Backup File has been mailed to You.'));
                           }
                        })
                       }else{ 
                          return resolve(that.ResponseController.successResponse(null,'Backup Successfull. Email Id missing, File stored on Server.'));
                       }
                    });
                }else if(reqdata.body.marketType == 'CD'){
                  tradeinfo.map(item => {
                    item['settPeriod'] = 7;
                    item['trdTm'] = moment(item['trdTm']).format('MM/DD/YY hh:mm:ss');
                    item['ordTm'] = moment(item['ordTm']).format('MM/DD/YY hh:mm:ss');
                    item['expDt'] = moment(item['expDt']).format('MM/DD/YY hh:mm:ss');
                    switch(item['booktype']){
                      case '1':
                        item['booktypename'] = 'RL';
                        break;
                      case '2':
                        item['booktypename'] = 'ST';
                        break;
                      case '3':
                        item['booktypename'] = 'SL';
                        break;
                      case '4':
                        item['booktypename'] = 'NT';
                        break;
                      case '7':
                        item['booktypename'] = 'AU';
                        break;
                    }
                    item['oppBrokerCd'] = item['oppBrokerCd'] ? item['oppBrokerCd'] : 'Nil';
                    item['ocFlag'] = 'Open';
                    item['cUcFlag'] = 'Uncover';
                  })
                  const csvWriter = createCsvWriter({
                    path: `${filePath}${fileName}`,
                    header: [
                    {"title":"Trade No.",
                     "id": "trdNo"
                    },
                    {"title":"Trade Status",
                     "id":"actTyp"
                    },
                    {"title":"Instrument Type",
                     "id":"inst"
                    },
                    {"title":"Symbol",
                     "id":"sym"
                    },
                    {"title":"Expiry Date",
                     "id":"expDt"
                    },
                    {"title":"Strike Price",
                     "id":"stePrc"
                    },
                    {"title":"Option Type",
                     "id":"optTyp"
                    },
                    {"title":"Security Name",
                     "id":"secName"
                    },
                    {"title":"Book Type",
                     "id": "booktype"
                    },
                    {"title":"Book Type Name",
                     "id": "booktypename"
                    },
                    {"title":"Market Type",
                     "id": "mktTyp"
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
                    {"title":"Open / Close Flag",
                     "id": "ocFlag"
                    },
                    {"title":"Covered / Uncovered Flag",
                     "id": "cUcFlag"
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
                    {"title":"TM Code",
                     "id": "TmCd"
                    },
                    {"title":"Order Entry Date / Time",
                     "id": "ordTm"
                    },
                    {"title":"CTCL ID",
                     "id": "ctclId"
                    }
                    ]
                  });

                  csvWriter
                    .writeRecords(tradeinfo)
                    .then(function(){
                       console.log("CSV written Successfully.");
                       const file = `${filePath}${fileName}`;
                       
                       let emailer = require('nodemailer');
                       let transport = emailer.createTransport({
                         service: 'gmail',
                         auth: {
                           user: 'help.notisapp@gmail.com',
                           pass: 'notis@123'
                         },
                          tls: {
                              rejectUnauthorized: false
                          }
                       });

                       if(reqdata.user.user_email){
                        let maildata= {
                          from: 'help.notisapp@gmail.com',
                          to: reqdata.user.user_email,
                          cc: ['vishuthedj@gmail.com'],
                          subject: `Trade Data Backup | ${fileName} | ${new Date()}`,
                          text: 
                          `Hi, 
                          Please find Trade backup file in the attachment section.

                          Regards
                          Team Notis App
                          `,
                          attachments: [
                              {
                                 path:  `${filePath}${fileName}` //pathOfTheAttachmet
                              }
                            ]
                        };
                        transport.sendMail(maildata, function(error, a){
                           if (error) {
                             console.log("Error in sending mail ---> ",error);
                             return resolve(that.ResponseController.successResponse(null,'Backup Successfull, Unable to Mail Backup File, File stored on Server.'));

                           } else {
                             console.log("Mail Sent ---> ",a);
                             return resolve(that.ResponseController.successResponse(null,'Backup Successfull, Backup File has been mailed to You.'));
                           }
                        })
                       }else{ 
                          return resolve(that.ResponseController.successResponse(null,'Backup Successfull. Email Id missing, File stored on Server.'));
                       }
                    });
                }else if(reqdata.body.marketType == 'FO'){
                  tradeinfo.map(item => {
                    item['settPeriod'] = 7;
                    item['trdTm'] = moment(item['trdTm']).format('MM/DD/YY hh:mm:ss');
                    item['ordTm'] = moment(item['ordTm']).format('MM/DD/YY hh:mm:ss');
                    item['expDt'] = moment(item['expDt']).format('MM/DD/YY hh:mm:ss');
                    switch(item['booktype']){
                      case '1':
                        item['booktypename'] = 'RL';
                        break;
                      case '2':
                        item['booktypename'] = 'ST';
                        break;
                      case '3':
                        item['booktypename'] = 'SL';
                        break;
                      case '4':
                        item['booktypename'] = 'NT';
                        break;
                      case '7':
                        item['booktypename'] = 'AU';
                        break;
                    }
                    item['oppBrokerCd'] = item['oppBrokerCd'] ? item['oppBrokerCd'] : 'Nil';
                    item['ocFlag'] = 'Open';
                    item['cUcFlag'] = 'Uncover';
                  })
                  const csvWriter = createCsvWriter({
                    path: `${filePath}${fileName}`,
                    header: [
                    {"title":"Trade No.",
                     "id": "trdNo"
                    },
                    {"title":"Trade Status",
                     "id":"actTyp"
                    },
                    {"title":"Instrument Type",
                     "id":"inst"
                    },
                    {"title":"Symbol",
                     "id":"sym"
                    },
                    {"title":"Expiry Date",
                     "id":"expDt"
                    },
                    {"title":"Strike Price",
                     "id":"stePrc"
                    },
                    {"title":"Option Type",
                     "id":"optTyp"
                    },
                    {"title":"Security Name",
                     "id":"secName"
                    },
                    {"title":"Book Type",
                     "id": "booktype"
                    },
                    {"title":"Book Type Name",
                     "id": "booktypename"
                    },
                    {"title":"Market Type",
                     "id": "mktTyp"
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
                    {"title":"Open / Close Flag",
                     "id": "ocFlag"
                    },
                    {"title":"Covered / Uncovered Flag",
                     "id": "cUcFlag"
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
                    {"title":"TM Code",
                     "id": "TmCd"
                    },
                    {"title":"Order Entry Date / Time",
                     "id": "ordTm"
                    },
                    {"title":"CTCL ID",
                     "id": "ctclId"
                    }
                    ]
                  });

                  csvWriter
                    .writeRecords(tradeinfo)
                    .then(function(){
                       console.log("CSV written Successfully.");
                       const file = `${filePath}${fileName}`;
                       
                       let emailer = require('nodemailer');
                       let transport = emailer.createTransport({
                         service: 'gmail',
                         auth: {
                           user: 'help.notisapp@gmail.com',
                           pass: 'notis@123'
                         },
                          tls: {
                              rejectUnauthorized: false
                          }
                       });

                       if(reqdata.user.user_email){
                        let maildata= {
                          from: 'help.notisapp@gmail.com',
                          to: reqdata.user.user_email,
                          cc: ['vishuthedj@gmail.com'],
                          subject: `Trade Data Backup | ${fileName} | ${new Date()}`,
                          text: 
                          `Hi, 
                          Please find Trade backup file in the attachment section.

                          Regards
                          Team Notis App
                          `,
                          attachments: [
                              {
                                 path:  `${filePath}${fileName}` //pathOfTheAttachmet
                              }
                            ]
                        };
                        transport.sendMail(maildata, function(error, a){
                           if (error) {
                             console.log("Error in sending mail ---> ",error);
                             return resolve(that.ResponseController.successResponse(null,'Backup Successfull, Unable to Mail Backup File, File stored on Server.'));

                           } else {
                             console.log("Mail Sent ---> ",a);
                             return resolve(that.ResponseController.successResponse(null,'Backup Successfull, Backup File has been mailed to You.'));
                           }
                        })
                       }else{ 
                          return resolve(that.ResponseController.successResponse(null,'Backup Successfull. Email Id missing, File stored on Server.'));
                       }
                    });
                }else{
                  return resolve(this.ResponseController.forbiddenErrorResponse("Stock Exchange Data for this market is Not Availble."))
                }

            } catch(e){
                reject(e);
            }
        });
    }

    saveCsvInDb(reqdata){
        return new Promise(async (resolve, reject) => {
            // let tokenController = new TokenController();
            try{
                let commoncheck = this.CommonController.commonCheck(reqdata, ['marketType'], 'query');
                let that = this;
                console.log("Common Check ----> ",commoncheck);
                if(commoncheck && commoncheck.length){
                    return resolve(this.ResponseController.badRequestErrorResponse(commoncheck))
                }
                //console.log("Current User ----> ",reqdata.user);
                let filedata = (reqdata.file.buffer).toString('binary').split('\n');
                console.log("Data Records to be Inserted ----> ",filedata.length);

                let marketType = null;
                switch(reqdata.query.marketType){
                    case 'CM' : 
                        await CMSecurity.drop();
                        for(let datarow of filedata){
                          let datacols = datarow.split('|');
                          console.log("CM Data Row ---> ", datarow, " Column Count ---> ", datacols.length);
                          if(datacols && datacols.length && datacols.length == 54){
                            let obj = {
                              symbol:datacols[1],
                              series:datacols[2],
                              security_name:datacols[21]
                            }
                            let nseRes = await CMSecurity.create(obj);
                          }
                        }
                        break;
                    case 'CD' : 
                        await CDContract.drop();
                        for(let datarow of filedata){
                          let datacols = datarow.split('|');
                          console.log("CD Data Row ---> ", datarow, " Column Count ---> ", datacols.length);
                          if(datacols && datacols.length && datacols.length == 69){
                            let obj = {
                              instrument_type: datacols[2],
                              symbol: datacols[3],
                              expiry_date: datacols[6],
                              strike_price: datacols[7],
                              option_type: datacols[8],
                              security_name: datacols[53],
                            }
                            let nseRes = await CDContract.create(obj);
                          }
                        }
                        break;
                    case 'FO' :
                        await FOContract.destroy({ truncate: true });
                        for(let datarow of filedata){
                          let datacols = datarow.split('|');
                          console.log("FO Data Row ---> ", datarow, " Column Count ---> ", datacols.length);
                          if(datacols && datacols.length && datacols.length == 69){
                            let obj = {
                              instrument_type: datacols[2],
                              symbol: datacols[3],
                              expiry_date: datacols[6],
                              strike_price: datacols[7],
                              option_type: datacols[8],
                              security_name: datacols[53],
                            }
                            let nseRes = await FOContract.create(obj);
                          }
                        }
                        break;
                }
                // console.log("File data ----> ",(reqdata.file.buffer).toString('binary'));
                //console.log("File data elements ----> ", filedata.length);
                return resolve(that.ResponseController.successResponse(null,'File uploaded Successfully.'));
                
            } catch(e){
                return reject(e);
            }
        });
    }    

}

module.exports = SummaryTradeData;