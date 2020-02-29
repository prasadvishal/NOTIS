
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('fo_security', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    instrument_type: { type: Sequelize.STRING, allowNull: false },
    symbol: { type: Sequelize.STRING, allowNull: false },
    expiry_date: { type: Sequelize.STRING, allowNull: false },
    strike_price: { type: Sequelize.STRING, allowNull: false },
    option_type: { type: Sequelize.STRING, allowNull: false },
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