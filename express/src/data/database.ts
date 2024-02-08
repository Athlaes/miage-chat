import { Sequelize } from 'sequelize';
import channel from './models/channel.model';
import message from './models/message.model';
import user from './models/user.model';

const dbUrl = process.env.DB_URL || "localhost:5432"

const sequelize = new Sequelize(`postgres://postgres:root@${dbUrl}/instant-app`)

channel(sequelize)
message(sequelize)
user(sequelize)

const { User, Message, Channel } = sequelize.models

User.belongsTo(Channel, {
    foreignKey: {
        allowNull: true,
        name: "channelId"
    },
    onDelete : "SET NULL",
    as : "channel"
})

Channel.belongsTo(User, {
    foreignKey: {
        allowNull: false,
        name: "adminId"
    },
    onDelete : "CASCADE",
    as : "user"
})

Message.belongsTo(Channel, {
    foreignKey:  {
        name: "channelId",
        allowNull: true
    },
    onDelete : "SET NULL",
    as: "channel"
})

Message.belongsTo(User, {
    foreignKey : {
        allowNull : false,
        name : "authorId"
    },
    as: "user"
})

try {
    sequelize.authenticate();
    sequelize.sync()
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export const db = sequelize;







