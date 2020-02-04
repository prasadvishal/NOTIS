
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('nse_data_resp', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    tradeType: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.STRING, allowNull: false },
    messageCode: { type: Sequelize.STRING, allowNull: false },
    dataAvailable: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: null},
    mktSts: { type: Sequelize.INTEGER, allowNull: false },
    currTrdDate: { type: Sequelize.INTEGER, allowNull: true },
    sfill1: { type: Sequelize.STRING, allowNull: true },
    sfill2: { type: Sequelize.STRING, allowNull: true },
    maxSeqNo: { type: Sequelize.INTEGER, allowNull: true },
    noOfRec: { type: Sequelize.INTEGER, allowNull: true },
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