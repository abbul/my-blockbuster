'use strict'

import { Request, Response } from 'express'
import ControllerAbstract from '../interfaces/controller-absctract'
import { SecurityService } from '../services'

class SecurityController extends ControllerAbstract {
  private securityService: SecurityService

  constructor () {
    super()
    this.securityService = new SecurityService()
  }

  login = async (req: Request, res: Response) => {
    try {
      const { BASIC_EMAIL: email, BASIC_PASSWORD: password } = req.body
      const resultService = await this.securityService.login(email, password)
      return this.response(res, 200, 'login success', resultService)
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }

  refreshToken = async (req: Request, res: Response) => {
    try {
      const {
        JWT_SUB: sub,
        JWT_AUD: aud,
        JWT_ID: id,
        JWT_ALIAS: alias
      } = req.body
      const resultService = await this.securityService.refreshToken(sub, aud, id, alias)
      return this.response(res, 200, 'refresh success', resultService)
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }
}

export { SecurityController }
