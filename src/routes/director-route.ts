import express from 'express'
import { DirectorController } from '../controllers'

const directorRoute = express.Router()

const directorController = new DirectorController()

directorRoute.post('/', directorController.create)

export {
  directorRoute
}
