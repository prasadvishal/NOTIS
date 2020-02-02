
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('notis_cd_actions', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    errCd: { type: Sequelize.INTEGER, allowNull: true },
    seqNo: { type: Sequelize.INTEGER, allowNull: true },
    actTrdNo: { type: Sequelize.INTEGER, allowNull: true },
    actDtTm: { type: Sequelize.INTEGER, allowNull: true },
    actId: { type: Sequelize.INTEGER, allowNull: true },
   
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