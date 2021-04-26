import dotenv from 'dotenv'

import sinon, { SinonStub } from 'sinon'
import { ActorService } from '../../src/services'
import { CREATE_ACTOR_OK } from '../mocks'
import actorModel from '../../src/db/models/actor-model'
dotenv.config()
let stubCreateActor: SinonStub

describe('Actor Service', () => {
  beforeEach(() => {
    stubCreateActor = sinon.stub(actorModel, 'create')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should persist an Actor', async () => {
    const actor = {
      name: 'Miguel',
      lastname: 'Russo'
    }
    stubCreateActor.resolves(Promise.resolve(CREATE_ACTOR_OK))
    const actorService = new ActorService()

    const result = await actorService.createActor(actor)
    expect(result.name).toBe(actor.name)
  })
})
