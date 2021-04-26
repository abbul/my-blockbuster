import directorRepository from '../db/repositories/director-repository'

class DirectorService {
  async createDirector (data : any) {
    const { name, lastname } = data

    return await directorRepository.save({
      name,
      lastname
    })
  }
}

export { DirectorService }
