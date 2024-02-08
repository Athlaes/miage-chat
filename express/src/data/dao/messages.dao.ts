import { db } from "../database"

const dao : any = {}

dao.findOneById = (id: string) : Promise<any> => {
    return db.models.Message.findOne({
        where : { 'id' : id },
        include : [{
            model: db.models.User,
            as: "user"
        }, {
            model : db.models.Channel,
            as: "channel"
        }],
        order: [['date', 'ASC']]
    })
}

dao.getAllMessagesFromChannelName = (channelName : string) : Promise<any> => {
    return db.models.Message.findAll({
        where : { '$channel.name$' : channelName },
        include : [{
            model: db.models.User,
            as: "user"
        }, {
            model : db.models.Channel,
            as: "channel"
        }],
        order: [['date', 'ASC']]
    })
}

dao.getAllMessagesFromChannelId = (channelId : string) : Promise<any>=> {
    return db.models.Message.findAll({
        where : { channelId : channelId },
        include : [{
            model: db.models.User,
            as: "user"
        }, {
            model : db.models.Channel,
            as: "channel"
        }],
        order: [['date', 'ASC']]
    })
}

export const messageDao = dao