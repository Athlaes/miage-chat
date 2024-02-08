import { Request, Response } from 'express'
import { db } from '../data/database'
import { sha512 } from 'js-sha512'

let controller: any = {}
controller.login = (req: Request, response: Response) => {
    db.models.User.findOne({ where: { email: req.body.email } })
        .then((res: any) => {
            if (res && res.pwdHash === sha512(req.body.password)) {
                response.json(res);
            } else {
                response.status(400).json("email ou mot de passe incorrect");
            }
        }
        )
        .catch(err => {
            console.log(err)
            response.status(500).json("Impossible de login l'utilisateur")
        })
}
export const authController: any = controller;