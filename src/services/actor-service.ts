import actorRepository from '../db/repositories/actor-repository'

class ActorService {
  async createActor (data : any) {
    const { name, lastname } = data

    return await actorRepository.save({
      name,
      lastname
    })
  }
}

export { ActorService }
