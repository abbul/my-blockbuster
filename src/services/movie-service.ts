import actorRepository from '../db/repositories/actor-repository'
import directorRepository from '../db/repositories/director-repository'
import movieRepository from '../db/repositories/movie-repository'

class MovieService {
  async createMovie (data : any) {
    const { name, origin, director_id: directorId, actors_id: actorsId } = data

    const director = await directorRepository.getToCreateGenericFilm(directorId)
    const actors = await actorRepository.getToCreateGenericFilm(actorsId)

    return await movieRepository.save({
      name,
      origin,
      director,
      actors
    })
  }

  async getMovies (queryString: any) {
    const { filters, orders } = this._extractFiltersAndOrder(queryString)
    return await movieRepository.getByFilters(filters, orders)
  }

  private _extractFiltersAndOrder (queryString: any) {
    const elements = Object.getOwnPropertyNames(queryString)
    const filters :any = {}
    const orders : any = {}

    elements.forEach((element : string) => {
      const words = element.split('-')
      const type = words[0]
      const property = words[1]
      if (type === 'filter') {
        filters[property] = queryString[element]
      } else if (type === 'order') {
        orders[property] = queryString[element]
      }
    })
    return {
      filters, orders
    }
  }
}

export { MovieService }
