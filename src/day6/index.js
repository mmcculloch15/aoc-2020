const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n')

console.log(input)

const goA = (input) => {
  let questionTotal = 0

  const questionsAnswered = new Set()

  for (const line of input) {
    if (line === '\r') {
      questionTotal += questionsAnswered.size
      questionsAnswered.clear()
    } else {
      for (const char of line) {
        if (char !== '\r') questionsAnswered.add(char)
      }
    }
  }
  questionTotal += questionsAnswered.size
  return questionTotal
}

const goB = (input) => {

}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
