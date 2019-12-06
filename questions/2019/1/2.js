const file = require('../../../util/files')

const calculateMass = (input) => {
  return Math.floor(input / 3) - 2
}

module.exports = () => {
  var input = file.getInput(2019, 1)
  input = input.split('\n')
  var result = 0
  for (var i = 0; i < input.length; i++) {
    var tempResult = input[i]

    while (tempResult > 0) {
      tempResult = calculateMass(tempResult)
      if (tempResult < 0) {
        tempResult = 0
      }
      result += tempResult
    }
  }

  return result
}
