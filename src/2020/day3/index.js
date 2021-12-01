const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n')
const NUM_COLUMNS = input[0].length

const findTreesForSlope = (slope) => {
  let treeCount = 0
  const position = { row: 0, column: 0 }
  while (position.row !== input.length - 1) {
    position.row += slope.down
    position.column += slope.right

    // realign the column index if we get to the end of the pattern
    if (position.column >= NUM_COLUMNS) {
      position.column -= NUM_COLUMNS
    }

    if (input[position.row][position.column] === '#') treeCount++

    if (position.row === input.length - 1) {
      return treeCount
    }
  }
}

const goA = (input) => {
  return findTreesForSlope({ right: 3, down: 1 })
}

const goB = (input) => {
  return (
    findTreesForSlope({ right: 1, down: 1 }) *
    findTreesForSlope({ right: 3, down: 1 }) *
    findTreesForSlope({ right: 5, down: 1 }) *
    findTreesForSlope({ right: 7, down: 1 }) *
    findTreesForSlope({ right: 1, down: 2 })
  )
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
