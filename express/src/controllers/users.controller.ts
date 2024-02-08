import { Request, Response } from 'express'
import { db } from '../data/database'
import { sha512 } from 'js-sha512'

let controller: any = {}

controller.getAll = (req: Request, response: Response) => {
    db.models.User.findAll({ where: { channelId: req.params.id } })
        .then((res) => response.json(res))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de récupérer les utilisateurs")
        })
}

controller.create = (req: Request, response: Response): void => {
    req.body.pwdHash = sha512(req.body.password)
    db.models.User.create(req.body)
        .then(res => response.status(200).json(res))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de créer l'utilisateur")
        })
}

controller.update = (req: Request, response: Response): void => {
    db.models.User.update({ channelId: req.body.channelId }, {
        where: {
            id: req.body.id
        }
    }).then(res => response.status(200).json(res))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de créer l'utilisateur")
        })
}

controller.delete = (req: Request, response: Response): void => {
    db.models.User.destroy({ where: req.body })
        .then(() => response.status(200))
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de supprimer l'utilisateur")
        })
}

export const usersController: any = controller;