import express from 'express'
import { SecurityController } from '../controllers'
import { credentialVerification } from '../middlewares/authentication-middlewate'
import { refreshTokenVerification } from '../middlewares/authorization-middleware'

const securityRoute = express.Router()
const securityController = new SecurityController()

securityRoute.post('/login', credentialVerification, securityController.login)

securityRoute.post('/refreshToken', refreshTokenVerification, securityController.refreshToken)

export {
  securityRoute
}
