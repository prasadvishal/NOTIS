
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('nse_data_resp', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    tradeType: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.STRING, allowNull: true },
    messageCode: { type: Sequelize.STRING, allowNull: true },
    dataAvailable: { type: Sequelize.BOOLEAN, allowNull: false},
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