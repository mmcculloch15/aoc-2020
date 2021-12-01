const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n')

const findSeats = () => {
  const seats = []
  for (const boardingPass of input) {
    let seatRow = 0
    let seatColumn = 0
    let numRows = 128
    let numColumns = 8
    const boardingRow = boardingPass.substring(0, 7)
    const boardingColumn = boardingPass.substring(7, 10)
    for (const command of boardingRow) {
      numRows = numRows / 2
      if (command === 'B') seatRow += numRows
    }

    for (const command of boardingColumn) {
      numColumns = numColumns / 2
      if (command === 'R') seatColumn += numColumns
    }

    const seatID = seatRow * 8 + seatColumn
    seats.push(seatID)
  }

  const sortAscending = (a, b) => a - b

  return seats.sort(sortAscending)
}

const goA = (input) => {
  const seats = findSeats()

  const highestSeat = seats.pop()
  return highestSeat
}

const goB = (input) => {
  const seats = findSeats()

  for (let i = 1; i < seats.length; i++) {
    if (seats[i + 1] - seats[i] === 2) return seats[i] + 1
  }
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
