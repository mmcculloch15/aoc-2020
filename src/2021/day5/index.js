const { test, readInput } = require('../../utils')

const prepareInput = (rawInput) => rawInput

// extract each number from an input string and return an array
const extractNumbers = (input) => {
  const regex = /\d+/g
  const numbers = []
  let match
  while ((match = regex.exec(input)) !== null) {
    numbers.push(match[0])
  }
  return numbers
}

const input = prepareInput(readInput())
  .split('\n')
  .map((line) => extractNumbers(line))

const populateCoordinates = (input, diagonals = false) => {
  const coordinates = new Set()
  const dangerCoordinates = new Set()

  for (line of input) {
    const y1 = parseInt(line[1])
    const y2 = parseInt(line[3])
    const x1 = parseInt(line[0])
    const x2 = parseInt(line[2])
    const isDiagonal = Math.abs(y2 - y1) / Math.abs(x2 - x1) === 1
    if (x1 === x2) {
      // vertical line
      const yMin = Math.min(y1, y2)
      const yMax = Math.max(y1, y2)
      for (let y = yMin; y <= yMax; y++) {
        if (coordinates.has(`${x1},${y}`)) dangerCoordinates.add(`${x1},${y}`)
        else coordinates.add(`${x1},${y}`)
      }
    }
    if (y1 === y2) {
      // horizontal line
      const xMin = Math.min(x1, x2)
      const xMax = Math.max(x1, x2)
      for (let x = xMin; x <= xMax; x++) {
        if (coordinates.has(`${x},${y1}`)) dangerCoordinates.add(`${x},${y1}`)
        else coordinates.add(`${x},${y1}`)
      }
    } else if (diagonals && isDiagonal) {
      const xMin = Math.min(x1, x2)
      const xMax = Math.max(x1, x2)
      let y, yOther
      if (xMin == line[0]) {
        y = y1
        yOther = y2
      } else {
        y = y2
        yOther = y1
      }
      let modifier = 1
      if (y > yOther) modifier = -1
      for (let x = xMin; x <= xMax; x++) {
        if (coordinates.has(`${x},${y}`)) dangerCoordinates.add(`${x},${y}`)
        else coordinates.add(`${x},${y}`)
        y += modifier
      }
    }
  }
  return dangerCoordinates.size
}

const goA = (input) => {
  const dangerCoordinates = populateCoordinates(input, false)
  return dangerCoordinates
}

const goB = (input) => {
  const dangerCoordinates = populateCoordinates(input, true)
  return dangerCoordinates
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
