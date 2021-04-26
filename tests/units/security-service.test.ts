import dotenv from 'dotenv'

import { SecurityService } from '../../src/services'
dotenv.config()

describe('Security Service', () => {
  it('should log in', async () => {
    const email = 'email@email.com'
    const password = 'password'
    const securityService = new SecurityService()

    const result = await securityService.login(email, password)

    expect(result.token).not.toBeNull()
    expect(result.refreshToken).not.toBeNull()
  })

  it('should refresh the Token', async () => {
    const sub = 'sub'
    const aud = 'aud'
    const id = 'id'
    const alias = 'alias'
    const securityService = new SecurityService()

    const result = await securityService.refreshToken(sub, aud, id, alias)

    expect(result).not.toBeNull()
  })
})
