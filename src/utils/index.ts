const getEnvironmentVariable = (name: string) => {
  const variable = process.env[name]
  if (!variable) {
    throw new Error(`the '${name}' environment variable is not defined`)
  }
  return variable
}

const responseJSON = (msg : string, data?: any) => {
  return {
    msg,
    data: data || []
  }
}

export {
  getEnvironmentVariable,
  responseJSON
}
