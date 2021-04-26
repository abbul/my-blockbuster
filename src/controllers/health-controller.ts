'use strict'

import { Request, Response } from 'express'
import ControllerAbstract from '../interfaces/controller-absctract'
import { HealthService } from '../services'

class HealthController extends ControllerAbstract {
    private healthService : HealthService

    constructor () {
      super()
      this.healthService = new HealthService()
    }

    get = async (req : Request, res : Response) => {
      try {
        const resultService = await this.healthService.validDB()
        return this.response(res, 200, 'Welcome to MyBlockbuster', resultService)
      } catch (error) {
        console.error(error)
        return this.handleException(res, error)
      }
    }
}

export { HealthController }
