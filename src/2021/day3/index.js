const { test, readInput } = require('../../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n')

const NUM_BITS = input[0].length
const NUM_BYTES = input.length

const generateGamma = (input) => {
  const gamma = new Array(NUM_BITS).fill(0) //most common digits

  input.forEach((byte) => {
    for (let i = 0; i < NUM_BITS; i++) {
      gamma[i] += parseInt(byte[i])
    }
  })
  return gamma
}

const generateRating = (input, type) => {
  let rating = 0
  let i = 0
  let workingInput = input
  while (workingInput.length > 1) {
    let numBytes = workingInput.length
    let gamma = generateGamma(workingInput)
    console.log(gamma)
    //filter out inputs based on the most commonly occurring digit
    if (gamma[i] / numBytes >= 0.5) {
      if (type === 'oxygen') workingInput = workingInput.filter((byte) => byte[i] === '1')
      else if (type === 'CO2') workingInput = workingInput.filter((byte) => byte[i] === '0')
    } else {
      if (type === 'oxygen') workingInput = workingInput.filter((byte) => byte[i] === '0')
      else if (type === 'CO2') workingInput = workingInput.filter((byte) => byte[i] === '1')
    }
    console.log('AFTER FILTERING', workingInput)

    //if we only have one digit left, we're done
    if (workingInput.length === 1) {
      console.log(workingInput[0])
      rating = parseInt(workingInput[0], 2)
      break
    }
    i++
  }
  return rating
}

const goA = (input) => {
  const gamma = generateGamma(input)
  let gammaValue = 0
  let epsilonValue = 0
  let bitCount = 1
  gamma.forEach((digit) => {
    if (digit / NUM_BYTES > 0.5) gammaValue += Math.pow(2, NUM_BITS - bitCount)
    else epsilonValue += Math.pow(2, NUM_BITS - bitCount)
    bitCount++
  })
  return gammaValue * epsilonValue
}

const goB = (input) => {
  const oxygenGeneratorRating = generateRating(input, 'oxygen')
  const CO2ScrubberRating = generateRating(input, 'CO2')

  return oxygenGeneratorRating * CO2ScrubberRating
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
