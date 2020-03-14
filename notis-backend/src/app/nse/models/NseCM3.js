
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('notis_cm', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    // tradeType: { type: Sequelize.STRING, allowNull: false },
    // errCd: { type: Sequelize.STRING, allowNull: false },
    seqNo: { type: Sequelize.BIGINT, allowNull: false },
    mkt: { type: Sequelize.STRING, allowNull: true },
    trdNo: { type: Sequelize.BIGINT, allowNull: true },
    trdTm: { type: Sequelize.BIGINT, allowNull: true },
    tkn: { type: Sequelize.INTEGER, allowNull: true },
    trdQty: { type: Sequelize.INTEGER, allowNull: true },
    trdPrc: { type: Sequelize.INTEGER, allowNull: true },
    bsFlg: { type: Sequelize.STRING, allowNull: true },
    ordNo: { type: Sequelize.DOUBLE, allowNull: true },
    brnCd: { type: Sequelize.INTEGER, allowNull: true },
    usrId: { type: Sequelize.INTEGER, allowNull: true },
    proCli: { type: Sequelize.INTEGER, allowNull: true },
    cliActNo: { type: Sequelize.STRING, allowNull: true },
    cpCd: { type: Sequelize.STRING, allowNull: true },
    remarks: { type: Sequelize.STRING, allowNull: true },
    actTyp: { type: Sequelize.INTEGER, allowNull: true },
    TCd: { type: Sequelize.INTEGER, allowNull: true },
    ordTm: { type: Sequelize.BIGINT, allowNull: true },
    mktTyp: { type: Sequelize.INTEGER, allowNull: true },
    aucNo: { type: Sequelize.INTEGER, allowNull: true },
    stpTyp: { type: Sequelize.STRING, allowNull: true },
    oppBrokerCd: { type: Sequelize.STRING, allowNull: true },
    trdTrigPrc: { type: Sequelize.STRING, allowNull: true },
    ctclId: { type: Sequelize.DOUBLE, allowNull: true },
    ordInst: { type: Sequelize.INTEGER, allowNull: true },
    secIdentifier: { type: Sequelize.STRING, allowNull: true },
    sym: { type: Sequelize.STRING, allowNull: true },
    ser: { type: Sequelize.STRING, allowNull: true },
    secName: { type: Sequelize.STRING, allowNull: true },
    IntrumentType: { type: Sequelize.INTEGER, allowNull: true },
    strPrc: { type: Sequelize.INTEGER, allowNull: true },
    // optType: { type: Sequelize.STRING, allowNull: true },
    fill1: { type: Sequelize.STRING, allowNull: true },
    fill2: { type: Sequelize.STRING, allowNull: true },
    fill3: { type: Sequelize.STRING, allowNull: true },
    fill4: { type: Sequelize.STRING, allowNull: true },
    fill5: { type: Sequelize.STRING, allowNull: true },
    fill6: { type: Sequelize.STRING, allowNull: true },
    fill7: { type: Sequelize.STRING, allowNull: true },
    fill8: { type: Sequelize.STRING, allowNull: true },
    security: { type: Sequelize.STRING, allowNull: true },
    // actTrdNo: { type: Sequelize.STRING, allowNull: false},
    // actDtTm: { type: Sequelize.STRING, allowNull: false },
    // actId: { type: Sequelize.STRING, allowNull: false },
    nseMainDataId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'nse_data_resps',
            key: 'id'
        }
         
    },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },

}, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false,
        deletedAt: false,
        paranoid: false
    }
);

nseDataModel.sync({ force: false }).then(() => console.log("Node table created"));

module.exports = nseDataModel;