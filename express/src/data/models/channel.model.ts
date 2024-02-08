import { DataTypes, Sequelize, UUIDV1 } from 'sequelize';

const Channel = (sequelize : Sequelize) => {
    sequelize.define('Channel', {
        id : {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            primaryKey: true,
            allowNull: false,
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    })
}

export default Channel;