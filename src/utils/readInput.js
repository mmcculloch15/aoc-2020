const { readFileSync } = require('fs')
const getCallerFile = require('get-caller-file')

const readInput = () => {
  const fileSeparator = process.platform === 'win32' ? '\\' : '/'

  const file = getCallerFile()
    .split(fileSeparator)
    .slice(0, -1)
    .concat('input.txt')
    .join(fileSeparator)

  return readFileSync(file).toString()
}

module.exports = readInput
