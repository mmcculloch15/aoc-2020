const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n')

const bags = {}
const bagCounts = {}
const confirmedBags = new Set()

// Will match the bag at the beginning that the rule applies for
// TODO: Improve to not catch 'contains no other bags' rules
const bagNameRegex = /(\d*)([a-z\s]*)\sbag/g
for (const line of input) {
  const bagIterator = [...line.matchAll(bagNameRegex)]

  let currentBag
  // Set up the initial bag data structure to be recursed on
  for (const bagMatch of bagIterator) {
    const bagName = bagMatch[2].trim()

    // clean up the ones that erroneously match my regex
    if (bagMatch.index === 0) {
      currentBag = bagName.replace(' bags contain no other', '')

      // create the keys for the bag
      bags[currentBag] = []
      bagCounts[currentBag] = []
    }

    if (bagMatch.index !== 0) {
      const bagCount = bagMatch[1].trim()
      bags[currentBag].push(bagName)

      // Generate bagCount data for part 2
      bagCounts[currentBag].push({ count: Number(bagCount), name: bagName })

      // if the currentBag can hold a shiny gold bag, add currentBag to the confirmed list
      if (bagName === 'shiny gold') {
        confirmedBags.add(currentBag)
      }
    }
  }
}

const goA = (input) => {
  // everything starts from these bags
  for (const confirmedBag of confirmedBags) {
    // trace each bag all the way up until it reaches the top, adding each bag to confirmed bags
    for (const possibleBag in bags) {
      if (bags[possibleBag].includes(confirmedBag)) confirmedBags.add(possibleBag)
    }
  }
  return confirmedBags.size
}

const goB = (input) => {
  const recursivelyTotalBags = (goldBags) => {
    return goldBags.reduce((acc, goldBag) => {
      const recurse = ({ count, name }) => {
        // if the bag we're checking is now empty, return 1 (representing the bag itself)
        if (bagCounts[name].length === 0) {
          return 1
        } else {
          // Look at the bags that current bag contains, and recursively count every bag inside
          const recursed = bagCounts[name].reduce((acc, bag) => {
            return acc + bag.count * recurse(bag)
          }, 0)
          // This number is the total number of contained bags, plus the containing bag itself
          return recursed + 1
        }
      }
      const total = goldBag.count * recurse(goldBag)
      return acc + total
    }, 0)
  }
  return recursivelyTotalBags(bagCounts['shiny gold'])
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
