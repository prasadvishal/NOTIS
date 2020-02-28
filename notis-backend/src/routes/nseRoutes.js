let NseToken = require("../app/nse/controllers/nseToken");
let NseResponse = require("../app/nse/controllers/nseResponse");
let nseToken = new NseToken();
let Middleware = require('../app/middleware/middleware')

module.exports = function(app, router) {
    let middleware = new Middleware();
    app.get('/health', (req, res) => {
        res.status(200).send({
            data: 'OK'
        });
    });

    app.get('/token', nseToken.getToken);
    // app.get('/dbConnection', nseToken.getDbData);
    app.get('/getNseUtils', async function(req, res){
        let NseUtils = require("../app/nse/controllers/nseUtils");
        let nseUtils = new NseUtils();
        res.send(await nseUtils.getNseData(req.query.trade_type));

    });

    // app.get('/getNotis-cd', async function(req, res){
    //     let NseUtils = require("../app/nse/controllers/nseUtils");
    //     let nseUtils = new NseUtils();
    //     let trade_type = req.query.trade_type;
    //     try{ 
    //         res.send(await nseUtils.getNseData([trade_type]));
    //     } catch(e){
    //         res.send({err: e});
    //     }
    // });

    //login api route
    app.post('/login', async function(req, res){
        let NseUtils = require("../app/nse/controllers/nseUtils");
        let nseUtils = new NseUtils();
        let nseResponse = new NseResponse();
        try{
            let resp = await nseUtils.userLogin(req)
            //console.log("Response Data ---> ",resp)
            res.send(resp);
        }catch(err){
            console.error("Error in login process ----> ", err);
            res.send(await nseResponse.serverErrorResponse());
        }

    });

    //getTradeData api route
    app.post('/getTradeData', middleware.authReq, async function(req, res){
        let TradeSummary = require("../app/summary/controllers/summary");
        let tradeSummary = new TradeSummary();
        let nseResponse = new NseResponse();
        try{
            let resp = await tradeSummary.getTradeData(req)
            //console.log("Response Data ---> ",resp)
            res.send(resp);
        }catch(err){
            console.error("Error in login process ----> ", err);
            res.send(await nseResponse.serverErrorResponse());
        }

    });    

    //getTradeData api route
    app.post('/getTradeDataBackup', middleware.authReq, async function(req, res){
        let TradeSummary = require("../app/summary/controllers/summary");
        let tradeSummary = new TradeSummary();
        let nseResponse = new NseResponse();
        try{
            let resp = await tradeSummary.getTradeDataBackup(req)
            //console.log("Response Data ---> ",resp)
            // res.setHeader('Content-Type', 'text/csv');
            // res.sendFile(resp.file);
            res.send(resp);
        }catch(err){
            console.error("Error in login process ----> ", err);
            res.send(await nseResponse.serverErrorResponse());
        }

    }); 
    //getFiltersMetadata api route
    app.get('/filters/metadata', middleware.authReq, async function(req, res){
        let NseUtils = require("../app/nse/controllers/nseUtils");
        let nseUtils = new NseUtils();
        let nseResponse = new NseResponse();
        try{
            let resp = await nseUtils.getFiltersMetadata(req.query)
            //console.log("Response Data ---> ",resp)
            res.send(resp);
        }catch(err){
            console.error("Error in login process ----> ", err);
            res.send(await nseResponse.serverErrorResponse());
        }

    });  
}