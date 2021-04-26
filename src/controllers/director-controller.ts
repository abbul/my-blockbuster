'use strict'

import { Request, Response } from 'express'
import ControllerAbstract from '../interfaces/controller-absctract'
import { DirectorService } from '../services'

class DirectorController extends ControllerAbstract {
    private directorService : DirectorService

    constructor () {
      super()
      this.directorService = new DirectorService()
    }

    create = async (req : Request, res : Response) => {
      try {
        const { director } = req.body
        if (!director) {
          return this.response(res, 400, 'property director not found')
        }
        const resultService = await this.directorService.createDirector(director)
        return this.response(res, 201, 'director created', resultService)
      } catch (error) {
        console.error(error)
        return this.handleException(res, error)
      }
    }
}

export { DirectorController }
