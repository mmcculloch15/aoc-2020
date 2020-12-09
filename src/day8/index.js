const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n').map((line) => line.split(' '))
let index = 0
let acc = 0

const reset = () => {
  index = 0
  acc = 0
}

/* attempt to modify a single command in a command list to a modified command type
   will run until the program completes successfully, or fail if all modifications
   result in an infinitely running program
*/
const exhaustivelyModifyCommands = (commandList, modifiedCommand) => {
  for (let i = 0; i < commandList.length; i++) {
    reset()
    let isRunning = true
    let commandCount = 0
    const commandIndex = commandList[i]

    // save the original command to reset the input array if necessary
    const originalCommand = input[commandIndex][0]
    input[commandIndex][0] = modifiedCommand

    while (isRunning) {
      commandCount++
      processCommand()
      if (index === input.length) return true
      if (commandCount === 500) {
        // change the failed modified input back
        input[commandIndex][0] = originalCommand
        isRunning = false
      }
    }
  }
  return false
}

// run a single command and update the global index and accumulator variables as needed
const processCommand = () => {
  if (!input[index]) {
    return false
  }
  const [command, arg] = input[index]
  switch (command) {
    case 'acc':
      index++
      acc += Number(arg)
      break
    case 'jmp':
      index += Number(arg)
      break
    case 'nop':
      index++
      break
    default:
      console.log('something unexpected happened...')
      return false
  }
  return true
}

const goA = (input) => {
  let isRunning = true
  const executedCommands = []

  while (isRunning) {
    if (executedCommands.includes(index)) {
      isRunning = false
    } else {
      executedCommands.push(index)
      processCommand()
    }
  }
  return acc
}

const goB = (input) => {
  const jmpCommands = []
  const nopCommands = []

  // group the jmp and nop command indexes
  input.map(([command, arg], index) => {
    if (command === 'jmp') jmpCommands.push(index)
    else if (command === 'nop') nopCommands.push(index)
  })

  // one of these should return true, at which point return the accumulator value
  if (exhaustivelyModifyCommands(jmpCommands, 'nop') ||
     exhaustivelyModifyCommands(nopCommands, 'jmp')) {
    return acc
  }
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
