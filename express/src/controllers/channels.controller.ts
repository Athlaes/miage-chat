import { Request, Response } from "express";
import { db } from '../data/database';

let controller : any = {}

controller.getAll = (req : Request, response : Response) : void => {
    db.models.Channel.findAll()
        .then((result : any) => response.json(result))
        .catch((err) => {
            console.log(err)
            response.status(500).json("Impossible de récupérer les channels")
        })
}

controller.create = (req : Request, response : Response) : void => {
    db.models.Channel.findOrCreate({where : req.body, defaults : req.body})
        .then(res => response.status(200).json(res[0]))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de créer le channel")
        })
}

controller.delete = (req : Request, response : Response) : void => {
    db.models.Channel.destroy({ where: req.body })
        .then(() => response.status(200))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de supprimer le channel")
        })
}

export const channelController : any = controller;