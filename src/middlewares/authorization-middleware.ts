import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY_REFRESH_TOKEN, SECRET_KEY_TOKEN } from '../constants'
import { responseJSON } from '../utils'

const tokenVerification = async (req : Request, res : Response, next : NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json(responseJSON('Authorization not found'))
  }

  const [type, token] = authorization.split(' ')

  if (!type || !token || type !== 'Bearer') {
    return res.status(400).json(responseJSON('Authorization invalid'))
  }

  try {
    const decoded :any = await jwt.verify(token, SECRET_KEY_TOKEN)

    if (!decoded) {
      return res.status(400).json(responseJSON('Invalid token'))
    }

    const sub = Object.prototype.hasOwnProperty.call(decoded, 'sub')
    const aud = Object.prototype.hasOwnProperty.call(decoded, 'aud')
    const id = Object.prototype.hasOwnProperty.call(decoded, 'id')
    const alias = Object.prototype.hasOwnProperty.call(decoded, 'alias')

    if (!sub || !aud || !id || !alias) {
      return res.status(400).json(responseJSON('Corrupt token'))
    }

    req.body.JWT_SUB = decoded.sub
    req.body.JWT_AUD = decoded.aud
    req.body.JWT_ID = decoded.id
    req.body.JWT_ALIAS = decoded.alias
    next()
  } catch (error) {
    return res.status(400).json(responseJSON('Token not valid'))
  }
}

const refreshTokenVerification = async (req : Request, res : Response, next : NextFunction) => {
  const { refresh_token: refreshToken } = req.headers

  if (!refreshToken || typeof refreshToken !== 'string') {
    return res.status(401).json(responseJSON('Refresh not found'))
  }

  try {
    const decoded :any = await jwt.verify(refreshToken, SECRET_KEY_REFRESH_TOKEN)

    if (!decoded) {
      return res.status(400).json(responseJSON('Invalid refresh token'))
    }

    const sub = Object.prototype.hasOwnProperty.call(decoded, 'sub')
    const aud = Object.prototype.hasOwnProperty.call(decoded, 'aud')
    const id = Object.prototype.hasOwnProperty.call(decoded, 'id')
    const alias = Object.prototype.hasOwnProperty.call(decoded, 'alias')

    if (!sub || !aud || !id || !alias) {
      return res.status(400).json(responseJSON('Corrupt refresh token'))
    }

    req.body.JWT_SUB = decoded.sub
    req.body.JWT_AUD = decoded.aud
    req.body.JWT_ID = decoded.id
    req.body.JWT_ALIAS = decoded.alias
    next()
  } catch (error) {
    return res.status(400).json(responseJSON('Refresh token not valid'))
  }
}

export {
  tokenVerification,
  refreshTokenVerification
}
