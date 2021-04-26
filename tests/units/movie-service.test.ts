import dotenv from 'dotenv'

import sinon, { SinonStub } from 'sinon'
import { MovieService } from '../../src/services'
import { FIND_ACTORS_FOR_FILM_GENERIC, FIND_DIRECTOR_FOR_FILM_GENERIC, CREATE_MOVIE_OK } from '../mocks'
import movieModel from '../../src/db/models/movie-model'
import directorModel from '../../src/db/models/director-model'
import actorModel from '../../src/db/models/actor-model'
dotenv.config()
let stubCreateMovie: SinonStub
let stubDirectorRepository: SinonStub
let stubActorRepository: SinonStub

describe('Movie Service', () => {
  beforeEach(() => {
    stubCreateMovie = sinon.stub(movieModel, 'create')
    stubDirectorRepository = sinon.stub(directorModel, 'findById')
    stubActorRepository = sinon.stub(actorModel, 'find')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should persist an Movie', async () => {
    const movie = {
      name: 'Titatic',
      origin: 'Mexico',
      director_id: 'asd',
      actors_id: 'asd'
    }
    stubDirectorRepository.resolves(Promise.resolve(FIND_DIRECTOR_FOR_FILM_GENERIC))
    stubActorRepository.resolves(Promise.resolve(FIND_ACTORS_FOR_FILM_GENERIC))
    stubCreateMovie.resolves(Promise.resolve(CREATE_MOVIE_OK))
    const movieService = new MovieService()

    const result = await movieService.createMovie(movie)
    expect(result.name).toBe(movie.name)
  })
})
