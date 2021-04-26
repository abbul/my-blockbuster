'use strict'

import { Request, Response } from 'express'
import ControllerAbstract from '../interfaces/controller-absctract'
import { MovieService } from '../services'

class MovieController extends ControllerAbstract {
    private movieService : MovieService

    constructor () {
      super()
      this.movieService = new MovieService()
    }

    getMany = async (req : Request, res : Response) => {
      try {
        const { query: queryString } = req
        const resultService = await this.movieService.getMovies(queryString)
        return this.response(res, 200, 'sent movies', resultService)
      } catch (error) {
        console.error(error)
        return this.handleException(res, error)
      }
    }

    create = async (req : Request, res : Response) => {
      try {
        const { movie } = req.body

        if (!movie) {
          return this.response(res, 400, 'property movie not found')
        }

        const resultService = await this.movieService.createMovie(movie)

        return this.response(res, 201, 'movie created', resultService)
      } catch (error) {
        console.error(error)
        return this.handleException(res, error)
      }
    }
}

export { MovieController }
