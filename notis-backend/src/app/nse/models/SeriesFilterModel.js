
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('series_filters', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    series: { type: Sequelize.STRING, allowNull: false },
    market_type: { type: Sequelize.STRING, allowNull: false },
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