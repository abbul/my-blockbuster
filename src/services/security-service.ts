import * as jwt from 'jsonwebtoken'
import { APP_NAME, SECRET_KEY_REFRESH_TOKEN, SECRET_KEY_TOKEN } from '../constants'
import MyException from '../interfaces/exception-class'

class SecurityService {
  async login (email: string, password: string) {
    const userMock = {
      sub: 'user.sub',
      aud: 'user.aud',
      id: 'user.id',
      alias: 'user.alias'
    }

    const user = userMock

    if (!user) {
      throw new MyException('Email or password invalid')
    }

    const isValidPassword = !!((email && password))

    if (!isValidPassword) {
      throw new MyException('Email or password invalid')
    }

    const token = await this._tokenCreation(SECRET_KEY_TOKEN, '15min', user)
    const refreshToken = await this._tokenCreation(SECRET_KEY_REFRESH_TOKEN, '30d', user)
    return { token, refreshToken }
  }

  async refreshToken (sub:string, aud : string, id :string, alias:string) {
    const user = {
      sub,
      aud,
      id,
      alias
    }
    return await this._tokenCreation(SECRET_KEY_TOKEN, '15min', user)
  }

  private async _tokenCreation (secretKey : string, expiresIn : string, user : any) {
    return await jwt.sign(
      {
        iss: APP_NAME,
        sub: user.sub,
        aud: user.aud,
        id: user.id,
        alias: user.alias
      },
      secretKey,
      { expiresIn }
    )
  }
}

export { SecurityService }
