'use strict'

import { Request, Response } from 'express'
import ControllerAbstract from '../interfaces/controller-absctract'
import { TvShowService } from '../services'

class TvShowController extends ControllerAbstract {
    private tvShowService : TvShowService

    constructor () {
      super()
      this.tvShowService = new TvShowService()
    }

    getEpisode = async (req : Request, res : Response) => {
      try {
        const { tv_show_id: twShowId, season_id: seasonId, episode_id: episodeId } = req.params
        const resultService = await this.tvShowService.getEpisode(twShowId, seasonId, episodeId)
        this.response(res, 200, 'sent episode', resultService)
      } catch (error) {
        console.error(error)
        return this.handleException(res, error)
      }
    }

    create = async (req : Request, res : Response) => {
      try {
        const { tv_show: tvShow } = req.body
        if (!tvShow) {
          return this.response(res, 400, 'property tv_show not found')
        }
        const resultService = await this.tvShowService.createTvShow(tvShow)
        return this.response(res, 201, 'tvShow created', resultService)
      } catch (error) {
        console.error(error)
        return this.handleException(res, error)
      }
    }
}

export { TvShowController }
