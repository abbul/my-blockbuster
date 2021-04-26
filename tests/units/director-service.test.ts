import dotenv from 'dotenv'

import sinon, { SinonStub } from 'sinon'
import { DirectorService } from '../../src/services'
import { CREATE_DIRECTOR_OK } from '../mocks'
import directorModel from '../../src/db/models/director-model'
dotenv.config()
let stubCreateDirector: SinonStub

describe('Director Service', () => {
  beforeEach(() => {
    stubCreateDirector = sinon.stub(directorModel, 'create')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should persist an Director', async () => {
    const director = {
      name: 'Miguel',
      lastname: 'Russo'
    }
    stubCreateDirector.resolves(Promise.resolve(CREATE_DIRECTOR_OK))
    const directorService = new DirectorService()

    const result = await directorService.createDirector(director)
    expect(result.name).toBe(director.name)
  })
})
