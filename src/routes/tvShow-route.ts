import express from 'express'
import { TvShowController } from '../controllers'

const tvShowRoute = express.Router()

const tvShowController = new TvShowController()

tvShowRoute.get('/:tv_show_id/:season_id/:episode_id/episode', tvShowController.getEpisode)

tvShowRoute.post('/', tvShowController.create)

export {
  tvShowRoute
}
