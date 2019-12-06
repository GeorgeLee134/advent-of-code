const inputLower = 240298
const inputUpper = 784956
const adjacent = /([0-9])\1+/g

const testNumber = (number) => {
  var match = number.toString().match(adjacent)
  if (match != null && match.some(n => n.length === 2)) {
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
  return false
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
