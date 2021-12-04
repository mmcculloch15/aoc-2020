const { test, readInput } = require('../../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())
  .split('\n')
  .filter((lines) => lines.length > 0) // remove empty lines

const numbersToCall = input.shift().split(',')

const boards = []
let boardCount = 0
let boardLineCount = 0
let newBoard = []
input.forEach((line) => {
  newBoard.push(line.trim().split(/\s+/))
  boardLineCount++
  if (boardLineCount === 5) {
    boardCount++
    boardLineCount = 0
    boards.push(newBoard)
    newBoard = []
  }
})

const markNumber = (number) => {
  boards.forEach((board) => {
    board.forEach((line) => {
      line.forEach((cell, i) => {
        if (cell === number) {
          line[i] = 'X'
        }
      }, line) //2nd arg to forEach can pass in the reference to the line so that I can modify it
    })
  })
}

const checkBingo = (board) => {
  let bingo = false

  // check rows
  for (line of board) {
    if (line.every((cell) => cell === 'X')) {
      return board
    }
  }
  //check columns
  for (let i = 0; i < 5; i++) {
    const column = board.map((line) => line[i])
    if (column.every((cell) => cell === 'X')) {
      return board
    }
  }
  return false
}

const calculateScore = (board) => {
  let score = 0
  for (line of board) {
    for (cell of line) {
      if (cell !== 'X') {
        score += parseInt(cell)
      }
    }
  }
  return score
}

const goA = () => {
  let bingoBoard
  let calledNumbers = 0

  let numbersToCallCopy = [...numbersToCall]
  while (!bingoBoard) {
    callNumber = numbersToCallCopy.shift()
    markNumber(callNumber)
    calledNumbers++
    if (calledNumbers >= 5) {
      for (board of boards) {
        bingoBoard = checkBingo(board)
        if (bingoBoard) break
      }
    }
  }
  return calculateScore(bingoBoard) * callNumber
}

const goB = () => {
  let bingoBoards = []
  let finalBingoBoard
  let calledNumbers = 0
  let numbersToCallCopy = [...numbersToCall]

  while (!finalBingoBoard) {
    callNumber = numbersToCallCopy.shift()
    markNumber(callNumber)
    calledNumbers++
    if (calledNumbers >= 5) {
      for (i in boards) {
        if (bingoBoards.includes(i)) continue //skip if a bingo was already achieved on this board
        if (checkBingo(boards[i])) {
          bingoBoards.push(i)
          if (bingoBoards.length === boardCount) {
            finalBingoBoard = boards[i]
          }
        }
      }
    }
  }
  return calculateScore(finalBingoBoard) * callNumber
}

console.time('Time')
const resultA = goA()
const resultB = goB()
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
