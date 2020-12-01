const { test, readInput } = require("../utils")

const prepareInput = (rawInput) => rawInput

const sortFunction = (a,b) => a - b

const input = prepareInput(readInput()).split('\n').map(inp => Number(inp)).sort(sortFunction)

const goA = (input) => {
  let found = 0;
  for(currentVal of input) {
    const searchVal = 2020 - currentVal
    if(input.find(val => val === searchVal) !== undefined) {
      console.log("found!", searchVal, currentVal)
      return searchVal*currentVal
    }
  }
  return "No matches found! :("
}

const goB = (input) => {
  
  for(currentVal of input) {
    const threshold = 2020 - currentVal
    const possibleSecondValues = input.filter(inp => inp <= threshold)
    for(possibleVal of possibleSecondValues) {
      const searchVal = threshold - possibleVal
      if(input.find(val => val === searchVal) !== undefined) {
        console.log(`found! ${currentVal} ${searchVal} ${possibleVal}`)
        return currentVal*searchVal*possibleVal
      }
    }
  }

  return "No matches found! :("
}

/* Tests */

// test(result, expected)

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
