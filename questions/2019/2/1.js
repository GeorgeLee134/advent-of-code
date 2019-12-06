const file = require('../../../util/files')

module.exports = () => {
  var input = file.getInput(2019, 2)
  input = input.split(',').map(i => Number(i))

  input[1] = 12
  input[2] = 2
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
