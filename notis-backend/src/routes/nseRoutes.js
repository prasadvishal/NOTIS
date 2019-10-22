let NseToken = require("../app/nse/controllers/nseToken");
let nseToken = new NseToken();


module.exports = function(app, router) {

    app.get('/health', (req, res) => {
        res.status(200).send({
            data: 'OK'
        });
    });

    app.get('/token', nseToken.getToken);
    app.get('/dbConnection', nseToken.getDbData);
    app.get('/getNseUtils', async function(req, res){
        let NseUtils = require("../app/nse/controllers/nseUtils");
        let nseUtils = new NseUtils();
        res.send(await nseUtils.getNseData("ab", "cd"));

    });

    app.get('/getNotis-cd', async function(req, res){
        let NseUtils = require("../app/nse/controllers/nseUtils");
        let nseUtils = new NseUtils();
        let trade_type = req.query.trade_type;
        try{ 
            res.send(await nseUtils.getNseData([trade_type]));
        } catch(e){
            res.send({err: e});
        }
    });
}