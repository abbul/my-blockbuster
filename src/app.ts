import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'
import {
  healthRoute,
  securityRoute,
  movieRoute,
  tvShowRoute,
  actorRoute,
  directorRoute
} from './routes'
import { CONNECTION_STRING, PORT } from './constants'

import { tokenVerification } from './middlewares'

const app = express()

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (error) => {
  if (error) throw error
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(helmet())
  app.use(cors({ origin: true, credentials: true }))

  app.use('/', healthRoute)
  app.use('/', securityRoute)
  app.use('/movies', tokenVerification, movieRoute)
  app.use('/tv-show', tokenVerification, tvShowRoute)
  app.use('/actors', tokenVerification, actorRoute)
  app.use('/directors', tokenVerification, directorRoute)

  app.listen(PORT, () => {
    console.log(`API REST listening on the http://localhost:${PORT}`)
  })
})

export default app
