const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n')

console.log(input)

const goA = (input) => {
  let questionTotal = 0

  const questionsAnswered = new Set()

  for (const line of input) {
    if (line === '') {
      questionTotal += questionsAnswered.size
      questionsAnswered.clear()
    } else {
      for (const char of line) {
        questionsAnswered.add(char)
      }
    }
  }
  questionTotal += questionsAnswered.size
  return questionTotal
}

const goB = (input) => {
  let questionTotal = 0
  let groupSize = 0
  let groupResponses = {}

  const checkGroupAnswers = (responses, size) => {
    let valid = 0
    for (const q in responses) {
      if (responses[q] === size) valid++
    }
    return valid
  }

  for (const line of input) {
    if (line === '') {
      questionTotal += checkGroupAnswers(groupResponses, groupSize)
      groupResponses = {}
      groupSize = 0
    } else {
      groupSize++
      for (const char of line) {
        if (!groupResponses[char]) {
          groupResponses[char] = 1
        } else {
          groupResponses[char]++
        }
      }
    }
  }
  questionTotal += checkGroupAnswers(groupResponses, groupSize)
  return questionTotal
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
