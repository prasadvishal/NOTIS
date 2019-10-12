module.exports = function (app, router) {

    router.get('/health', (req, res) => {
        res.status(200).send({data: 'OK'});
    });
}