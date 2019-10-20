let NseController = require("../app/nse/controllers/nseToken");



module.exports = function(app, router) {

    app.get('/health', (req, res) => {
        res.status(200).send({
            data: 'OK'
        });
    });

    app.get('/token', NseController.getToken);
    app.get('/dbConnection', NseController.getDbData);
}