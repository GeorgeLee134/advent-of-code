const inputLower = 240298
const inputUpper = 784956
const adjacent = /^(?=.*(.)\1)[0-9]+$/

const testNumber = (number) => {
  if (adjacent.test(number)) {
    const stringNumber = number.toString().split('').map(n => Number(n)).reduce((a, c) => {
      if (a <= c) {
        a = c
      } else {
        a = 99
      }
      return a
    }, 0)
    if (stringNumber !== 99) {
      return true
    }
    return false
  }
}

module.exports = () => {
  var result = 0

  for (var number = inputLower; number < inputUpper; number++) {
    if (testNumber(number)) {
      result++
    }
  }
  return result
}
