import { Response } from 'express'
import { responseJSON } from '../utils'
import MyException from './exception-class'

abstract class ControllerAbstract {
  protected response (res: Response, code: number, msg: string, data? : any) {
    return res.status(code).json(responseJSON(msg, data))
  }

  protected handleException (res : Response, error : Error) {
    console.error(error)
    return (error instanceof MyException)
      ? this.response(res, 400, error.message, [error.name])
      : this.response(res, 500, 'Internal Error', [error.toString()])
  }
}

export default ControllerAbstract
