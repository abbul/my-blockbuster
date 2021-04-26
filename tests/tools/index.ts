import fs from 'fs'
import path from 'path'
const pathTests = path.join(__dirname, '../')

const readMockFile = (pathFile: string, encoding: any = 'utf-8') => {
  return fs.readFileSync(`${pathTests}/${pathFile}`, { encoding })
}

export {
  readMockFile
}
