class MyException extends Error {
  constructor (msg: string, name?: string) {
    super()
    this.message = msg
    this.name = name || 'MyException'
  }
}

export default MyException
