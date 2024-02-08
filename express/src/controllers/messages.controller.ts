import { Request, Response } from 'express'
import { db } from '../data/database'
import { messageDao } from '../data/dao/messages.dao'

let controller : any = {}

controller.getAllFromChannel = (req : Request, response : Response) => {
    messageDao.getAllMessagesFromChannelId(req.params.id)
    .then((res: any) => response.json(res))
    .catch((err: any) => {
        console.log(err)
        response.status(500).json("Impossible de récupérer le message")
    })
}

controller.create = (req : Request, response : Response) : void => {
    req.body.authorId = req.body.user.id
    req.body.channelId = req.body.channel.id
    db.models.Message.create(req.body)
        .then(res => response.status(200).json(res))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de créer le message")
        })
}

controller.update = (req : Request, response : Response) : void => {
    db.models.Message.update(req.body, {where : { id : req.body.id }})
        .then(res => response.status(200).json(res))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de créer le message")
        })
}

controller.delete = (req : Request, response : Response) : void => {
    db.models.Message.destroy({ where: req.body })
        .then(() => response.status(200))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de supprimer le message")
        })
}

export const messagesController : any = controller;