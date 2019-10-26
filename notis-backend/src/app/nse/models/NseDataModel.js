
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('nse_data', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    tradeType: { type: Sequelize.STRING, allowNull: false },
    errCd: { type: Sequelize.INTEGER, allowNull: false },
    seqNo: { type: Sequelize.INTEGER, allowNull: false },
    actTrdNo: { type: Sequelize.BIGINT, allowNull: false},
    actDtTm: { type: Sequelize.DATE, allowNull: false },
    actId: { type: Sequelize.INTEGER, allowNull: false },
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