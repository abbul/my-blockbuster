import express from 'express'
import { MovieController } from '../controllers'

const movieRoute = express.Router()

const movieController = new MovieController()

movieRoute.get('/', movieController.getMany)

movieRoute.post('/', movieController.create)

export {
  movieRoute
}
