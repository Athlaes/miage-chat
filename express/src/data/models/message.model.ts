import { DataTypes, Sequelize, UUIDV1 } from 'sequelize';

export default (sequelize : Sequelize) => {
    sequelize.define('Message', {
        id : {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        text : {
            type: DataTypes.STRING,
            allowNull: false
        },
        date : {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        }
    }, {
        freezeTableName: true
    })
}