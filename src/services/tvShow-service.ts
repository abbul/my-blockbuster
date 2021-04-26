import actorRepository from '../db/repositories/actor-repository'
import directorRepository from '../db/repositories/director-repository'
import tvShowRepository from '../db/repositories/tvShow-repository'

class TvShowService {
  async createTvShow (data : any) {
    const { name, origin, seasons, director_id: directorId, actors_id: actorsId } = data

    const director = await directorRepository.getToCreateGenericFilm(directorId)
    const actors = await actorRepository.getToCreateGenericFilm(actorsId)

    return await tvShowRepository.save({
      name,
      origin,
      seasons,
      director,
      actors
    })
  }

  async getEpisode (tvShowId : string, seasonId: string, episodeId : string) {
    return await tvShowRepository.getEpisodeByIds(tvShowId, seasonId, episodeId)
  }
}

export { TvShowService }
