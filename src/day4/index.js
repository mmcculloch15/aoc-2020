const { readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput()).split('\n')
const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const EYE_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const hasRequiredFields = (passport) => {
  for (const field of REQUIRED_FIELDS) {
    if (!Object.keys(passport).includes(field)) {
      return false
    }
  }
  return true
}

const hasValidFields = (passport) => {
  let isValidField
  for (const field of Object.keys(passport)) {
    const fieldValue = passport[field]
    switch (field) {
      case 'byr':
        console.log(`${field} ${fieldValue}`)
        isValidField = Number(fieldValue) >= 1920 && Number(fieldValue) <= 2002
        console.log(isValidField)
        break
      case 'iyr':
        isValidField = Number(fieldValue) >= 2010 && Number(fieldValue <= 2020)
        break
      case 'eyr':
        isValidField = Number(fieldValue) >= 2020 && Number(fieldValue) <= 2030
        break
      case 'hgt':
        if (fieldValue.includes('cm')) {
          const height = /^(\d+)cm/.exec(fieldValue)[1]
          isValidField = height >= 150 && height <= 193
        } else if (fieldValue.includes('in')) {
          const height = /^(\d+)in/.exec(fieldValue)[1]
          isValidField = height >= 59 && height <= 76
        }
        break
      case 'hcl':
        isValidField = /^#[a-f\d]{6}$/.test(fieldValue)
        break
      case 'ecl':
        isValidField = EYE_COLORS.includes(fieldValue)
        break
      case 'pid':
        isValidField = /^\d{9}$/.test(fieldValue)
        break
      case 'cid':
        isValidField = true
        break
      default:
        isValidField = false
        break
    }

    if (!isValidField) {
      return false
    }
  }
  return true
}

const goA = (input) => {
  let passport = {}
  let validPassports = 0

  for (const line of input) {
    if (line === '') {
      if (hasRequiredFields(passport) === true) {
        validPassports++
      }
      passport = {}
    } else {
      line.split(' ').forEach(field => {
        const [key, value] = field.split(':')
        passport[key] = value
      })
    }
  }
  if (hasRequiredFields(passport)) validPassports++
  return validPassports
}

const goB = (input) => {
  let passport = {}
  let validPassports = 0
  for (const line of input) {
    if (line === '') {
      if (hasRequiredFields(passport) && hasValidFields(passport)) {
        validPassports++
      }
      passport = {}
    } else {
      line.split(' ').forEach(field => {
        const [key, value] = field.split(':')
        passport[key] = value
      })
    }
  }
  if (hasRequiredFields(passport) && hasValidFields(passport)) validPassports++
  return validPassports
}

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
