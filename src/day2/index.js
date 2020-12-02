const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

// TODO: Use a regex here
const input = prepareInput(readInput()).split('\n').map(line => ({
  firstNum: line.split('-')[0],
  secondNum: line.split('-')[1].split(' ')[0],
  character: line.split(' ')[1][0],
  password: line.split(' ')[2]
}))

const goA = (input) => {
  let matchingPasswords = 0
  for (const line of input) {
    let count = 0
    const { firstNum: minTimes, secondNum: maxTimes, character, password } = line
    for (const char of password) {
      if (char === character) count++
    }

    if (count >= minTimes && count <= maxTimes) {
      matchingPasswords++
    }
  }
  return matchingPasswords
}

const goB = (input) => {
  let matchingPasswords = 0
  for (const line of input) {
    let matchingPositions = 0
    const { firstNum: firstPos, secondNum: secondPos, character, password } = line
    if (password[firstPos - 1] === character) matchingPositions++
    if (password[secondPos - 1] === character) matchingPositions++
    if (matchingPositions === 1) matchingPasswords++
  }
  return matchingPasswords
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
