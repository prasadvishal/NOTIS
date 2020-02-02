let NseToken = require("../app/nse/controllers/nseToken");
let NseResponse = require("../app/nse/controllers/nseResponse");
let nseToken = new NseToken();


module.exports = function(app, router) {

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
            console.log("Response Data ---> ",resp)
            res.send(resp);
        }catch(err){
            console.error("Error in login process ----> ", err);
            res.send(await nseResponse.serverErrorResponse());
        }

    });    
}