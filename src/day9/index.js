const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n').map(line => Number(line))

const PREAMBLE_SIZE = 25

const findSums = (index) => {
  const searchNumber = input[index]
  let found = false

  const checkValidSums = (startIndex, currentIndex, searchNumber) => {
    const sum = input[startIndex] + input[currentIndex]
    if (startIndex !== currentIndex) {
      if (sum === searchNumber) {
        found = true
      }
    }
    if (startIndex - currentIndex === PREAMBLE_SIZE) return found
    else checkValidSums(startIndex, currentIndex - 1, searchNumber)
  }

  for (let i = index - 1; i >= index - PREAMBLE_SIZE && found === false; i--) {
    checkValidSums(i, index - 1, searchNumber)
  }
  return found
}

const goA = (input) => {
  for (let i = PREAMBLE_SIZE; i < input.length; i++) {
    const res = findSums(i)
    if (res === false) return input[i]
  }
}

const goB = (input, resultA) => {
  for (let i = 0; i < input.length; i++) {
    let sum = input[i]
    for (let j = i + 1; j < input.length; j++) {
      sum += input[j]
      if (sum === resultA) {
        return input[i] + input[j]
      }
    }
  }
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input, resultA)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
