const { test, readInput } = require('../../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n')

const goA = (input) => {
  const subPosition = { horizontal: 0, depth: 0 }
  for (commands of input) {
    const [direction, magnitude] = commands.split(' ')
    switch (direction) {
      case 'forward':
        subPosition.horizontal += parseInt(magnitude)
        break
      case 'down':
        subPosition.depth += parseInt(magnitude)
        break
      case 'up':
        subPosition.depth -= parseInt(magnitude)
        break
      default:
        throw new Error(`Unknown direction ${direction}`)
    }
  }
  return subPosition.horizontal * subPosition.depth
}

const goB = (input) => {
  const subPosition = { horizontal: 0, depth: 0, aim: 0 }
  for (commands of input) {
    const [direction, magnitude] = commands.split(' ')
    switch (direction) {
      case 'forward':
        subPosition.horizontal += parseInt(magnitude)
        subPosition.depth += subPosition.aim * magnitude
        break
      case 'down':
        subPosition.aim += parseInt(magnitude)
        break
      case 'up':
        subPosition.aim -= parseInt(magnitude)
        break
      default:
        throw new Error(`Unknown direction ${direction}`)
    }
  }

  return subPosition.horizontal * subPosition.depth
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
