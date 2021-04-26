import dotenv from 'dotenv'

import sinon, { SinonStub } from 'sinon'
import { HEALTH_SERVICE_RESP_OK } from '../mocks/service-mock'
import { HealthService } from '../../src/services'
import { connection } from 'mongoose'
dotenv.config()
let stubMongoose: SinonStub

describe('Health Service', () => {
  beforeEach(() => {
    stubMongoose = sinon.stub(connection, 'readyState')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('validDepencies - OK', async () => {
    stubMongoose.value(1)
    const healthService = new HealthService()

    const result = await healthService.validDB()
    expect(JSON.stringify(result)).toBe(JSON.stringify(HEALTH_SERVICE_RESP_OK))
  })
})
