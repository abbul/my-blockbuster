import { connection } from 'mongoose'

class HealthService {
  async validDB () {
    try {
      const dbStatus = connection.readyState
      return { db: (dbStatus === 1) ? 'OK' : 'ERR' }
    } catch (err) {
      console.error(err)
      return { db: 'ERR' }
    }
  }
}

export { HealthService }
