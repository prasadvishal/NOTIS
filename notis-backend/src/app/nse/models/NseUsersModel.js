
let Sequelize = require('sequelize');

let nseDataModel = DBConnection.define('nse_users', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    user_name: { type: Sequelize.STRING, allowNull: false },
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: true },
    email: { type: Sequelize.STRING, allowNull: false },
    phone: { type: Sequelize.INTEGER, allowNull: true },
    role: { type: Sequelize.STRING, allowNull: false },
    token: { type: Sequelize.STRING, allowNull: true },
    occupation: { type: Sequelize.STRING, allowNull: true },
    emp_code: { type: Sequelize.STRING, allowNull: true },
    user_img_url: { type: Sequelize.STRING, allowNull: true },
    last_login_at: { type: Sequelize.DATE, allowNull: true },
    otp: { type: Sequelize.INTEGER, allowNull: true },
    created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },

}, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        paranoid: false
    }
);

nseDataModel.sync({ force: false }).then(() => console.log("Node table created"));

module.exports = nseDataModel;