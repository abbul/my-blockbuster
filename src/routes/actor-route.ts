import express from 'express'
import { ActorController } from '../controllers'

const actorRoute = express.Router()

const actorController = new ActorController()

actorRoute.post('/', actorController.create)

export {
  actorRoute
}
