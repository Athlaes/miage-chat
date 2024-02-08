import { DataTypes, Sequelize, UUIDV1 } from 'sequelize';

export default (sequelize : Sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    email : {
      type: DataTypes.STRING
    },
    pwdHash : {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
  })
}
