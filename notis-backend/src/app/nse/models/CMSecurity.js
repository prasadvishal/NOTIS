
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('cm_security', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    symbol: { type: Sequelize.STRING, allowNull: false },
    series: { type: Sequelize.STRING, allowNull: false },
    security_name: { type: Sequelize.STRING, allowNull: false },
    created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },

}, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
        deletedAt: false,
        paranoid: false
    }
);

nseDataModel.sync({ force: false }).then(() => console.log("Node table created"));

module.exports = nseDataModel;