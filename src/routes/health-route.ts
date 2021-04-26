import express from 'express'
import { HealthController } from '../controllers'

const healthRoute = express.Router()

const healthController = new HealthController()

healthRoute.get('/health', healthController.get)

export {
  healthRoute
}
