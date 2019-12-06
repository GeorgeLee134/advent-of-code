const file = require('../../../util/files')
const runIntCode = (input) => {
  for (var i = 0; i < input.length; i += 4) {
    var optCode = input[i]
    var second = input[i + 1]
    var third = input[i + 2]
    var last = input[i + 3]

    switch (optCode) {
      case 1:
        input[last] = input[second] + input[third]
        break
      case 2:
        input[last] = input[second] * input[third]
        break
      case 99:
        i = input.length
    }
  }
  return input[0]
}

module.exports = () => {
  var input = file.getInput(2019, 2)
  input = input.split(',').map(i => Number(i))
  var testInput = []
  for (var n = 0; n < 100; n++) {
    for (var v = 0; v < 100; v++) {
      testInput = input.slice()
      input[1] = n
      input[2] = v
      var value = runIntCode(testInput)
      if (value === 19690720) {
        return (100 * n + v) - 1
      }
    }
  }

  return 'Should never hit here! Better practise would be to throw an error!'
}
