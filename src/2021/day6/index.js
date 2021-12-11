const { test, readInput } = require('../../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split(',').map(Number)

const ageFish = (input, numDays) => {
  let fish = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let dayCount = 0

  input.forEach((num) => {
    fish[num]++
  })

  while (dayCount < numDays) {
    let newFish = Array(9).fill(0)
    fish.forEach((num, index) => {
      if (index === 0) {
        newFish[8] += num
        newFish[6] += num
      } else {
        newFish[index - 1] += num
      }
    })
    fish = [...newFish]
    dayCount++
  }
  return fish
}

const goA = (input) => {
  const agedFish = ageFish(input, 80)
  return agedFish.reduce((acc, curr) => acc + curr)
}

const goB = (input) => {
  const agedFish = ageFish(input, 256)
  return agedFish.reduce((acc, curr) => acc + curr)
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
