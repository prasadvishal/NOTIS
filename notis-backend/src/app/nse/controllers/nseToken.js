let request = require('request');
let mysql = require('mysql');
let Utils = require('../../../config/Utils.js');
// let utils = new Utils();

class NseToken {
    constructor(){
        this.utils = new Utils();
    }

    async getToken() {
        let that = this;
        if(!that.utils.isEmpty(C.tokenData)){
            if((new Date(C.tokenData.createdAt + C.tokenData.expires_in)) < (new Date()).getTime()){
                return C.tokenData.access_token;
            } else{
                return await this.getNewToken();
            }
        } else{
            return await this.getNewToken();
        }
    }

    getNewToken() { 
        //TODO log in db
        return new Promise((resolve, reject) =>{ 
            let that = this;
            let bodyData = {
                url: C.NSE_HOST+'/token',
                headers: {
                    'Authorization': 'Basic MDZiZTczNGVjYWYzNGQ3MDgxZTE5YWI1Zjk0OTBiZGM6ODI2MDMxM2FmMTYzNDFiNGJjOWI4N2JkNGQ2YWVjMmE=',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'nonce': that.utils.getNOnce()
                },
                body: {'grant_type': C.CLIENT_CRENDENTIALS},
            }
            
            try {
                request({
                    url: C.NSE_HOST+'/token',
                    method:'POST',
                    headers:{
                        'Authorization': 'Basic MDZiZTczNGVjYWYzNGQ3MDgxZTE5YWI1Zjk0OTBiZGM6ODI2MDMxM2FmMTYzNDFiNGJjOWI4N2JkNGQ2YWVjMmE=',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'nonce': that.utils.getNOnce()
                    },
                    form: {'grant_type': C.CLIENT_CRENDENTIALS}
                }, function(er, resp, body){
                    body = {
                            "access_token": "ee1073de-45d0-4040-b9c2-eddfa80280c0",
                            "token_type": "bearer",
                            "expires_in": "3600",
                            "scope": "api_scope"  
                    }
                    if(that.utils.isEmpty(er) && !that.utils.isEmpty(body.access_token)){
                        body.createdAt = (new Date()).getTime();
                        C.tokenData = body;
                    }
                    resolve(body.access_token);
                })
    
            } catch (err) {
                console.error("NOTIS Error Caught ---------->  ", err);
                reject(err);
                // res.send({"error":err})
            }
        })
    }

    getDbData(req, res) {
        try {
    
            if(DBConnection){        
                DBConnection.query("SELECT * FROM Persons", function (err, result, fields) {
                    if (err) {
                        console.log("Error: ",err);
                        res.send({code:500,msg:err})
                    }
                    else{
                        console.log("Db Data ----> ",result);
                        res.send({code:200,data:result})
                    }
                });
            }else{
                console.log("Db Not Connected.")
                res.send({code:500,msg:"Db Not Connected."})
            }
        } catch (err) {
            console.error("Db Connectiob Error Caught ---------->  ", err);
            res.send({"error":err})
        }
    }

    

}


module.exports = NseToken;


