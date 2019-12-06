const file = require('../../../util/files')

module.exports = () => {
  var input = file.getInput(2019, 1)
  input = input.split('\n')
  var result = 0
  for (var i = 0; i < input.length; i++) {
    const currentMass = input[i]
    result += Math.floor(currentMass / 3) - 2
  }

  return result
}
