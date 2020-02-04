module.exports =  {
    NSE_HOST: "https://www.devconnect2nse.com",
    VERSION: "1.0",
    DATA_FORMAT: "CSV:CSV",
    CLIENT_CRENDENTIALS: "client_credentials",
    tokenData:{},
    MEMBER_CODE: "12345",
    DATA_API_URL: "http://10.10.11.214:3002",
    'CM':{
        name: 'notis_cm',
        url:'/notis-cm/trades-inquiry',
        table: 'notis_cm_1.3'
    },
    'CD':{
        name: 'notis_cd',
        url:'/notis-cd/trades-inquiry',
        table: 'notis_cd'
    },
    'FO':{
        name: 'notis_fo',
        url:'/api/inquiry-fo/trades-inquiry',
        table: 'notis_fo'
    },

    allowedTradeType: ['CM', 'CD', 'FO'],

    SERVER_ERROR:{
        CODE: 500,
        STATUS: "Internal Server Error. Please try after sometime."
    },
    BAD_REQUEST_ERROR:{
        CODE:400,
        STATUS: "Bad Reqest."
    },
    NOT_FOUND_ERROR:{
        CODE:404,
        STATUS: "Not Found."
    },
    UNAUTHORISED_ERROR:{
        CODE: 401,
        STATUS: "Unauthorised Request."
    },
    FORBIDDEN_ERROR:{
        CODE:403,
        STATUS:"Forbidden Request."
    },
    BAD_GATEWAY_ERROR:{
        CODE: 502,
        STATUS:"Bad Gateway."
    },
    SERVICE_UNAVAILABLE_ERROR:{
        CODE: 503,
        STATUS:"Service Unavailable."
    },
    OK_SUCCESS:{
        CODE:200,
        STATUS: "OK"
    },
    CREATED_SUCCESS:{
        CODE:201,
        STATUS: "Created."
    },
    ACCEPTED_SUCCESS:{
        CODE:202,
        STATUS: "Accepted."
    },
    NO_CONTENT_SUCCESS:{
        CODE:204,
        STATUS: "No Content."
    },
    

    
}