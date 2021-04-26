'use strict'

import { Request, Response } from 'express'
import ControllerAbstract from '../interfaces/controller-absctract'
import { ActorService } from '../services'

class ActorController extends ControllerAbstract {
    private actorService : ActorService

    constructor () {
      super()
      this.actorService = new ActorService()
    }

    create = async (req : Request, res : Response) => {
      try {
        const { actor } = req.body
        if (!actor) {
          return this.response(res, 400, 'property actor not found')
        }
        const resultService = await this.actorService.createActor(actor)
        return this.response(res, 200, 'actor created', resultService)
      } catch (error) {
        console.error(error)
        return this.handleException(res, error)
      }
    }
}

export { ActorController }
