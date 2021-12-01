const { test, readInput } = require("../../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n').map(Number)

const goA = (input) => {
  let i = 1
  let increases = 0
  while(input.length >= i) {
    if(input[i] > input[i-1]) increases++
    i++
  }
  return increases
}

const goB = (input) => {
  let i = 0
  let increases = 0
  while(input.length >= i - 2) {
    const first = input[i] + input[i+1] + input[i+2]
    const second = input[i+1] + input[i+2] + input[i+3]
    if(second > first) increases++
    i++
  }
  return increases
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
