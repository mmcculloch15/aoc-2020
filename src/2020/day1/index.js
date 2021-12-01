const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n').map(inp => Number(inp))

const goA = (input) => {
  for (const currentVal of input) {
    const searchVal = 2020 - currentVal
    if (input.find(val => val === searchVal) !== undefined) {
      return searchVal * currentVal
    }
  }
  return 'No matches found! :('
}

const goB = (input) => {
  for (const currentVal of input) {
    const threshold = 2020 - currentVal
    const possibleSecondValues = input.filter(inp => inp <= threshold)
    for (const possibleVal of possibleSecondValues) {
      const searchVal = threshold - possibleVal
      if (input.find(val => val === searchVal) !== undefined) {
        return currentVal * searchVal * possibleVal
      }
    }
  }

  return 'No matches found! :('
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
