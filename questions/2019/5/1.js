const file = require('../../../util/files')

const getValueOrPos = (mode, value, input) => {
  if (mode === undefined) {
    return input[value]
  }

  if (mode === 0) {
    return input[value]
  }
  return value
}

module.exports = () => {
  var input = file.getInput(2019, 5)
  input = input.split(',').map(i => Number(i))
  var increaseValue = 4
  for (var i = 0; i < input.length; i += increaseValue) {
    var optCodeSplit = input[i].toString().split('')
    var optCodeLength = optCodeSplit.length
    var optCode = input[i]
    var c = 0; var b = 0; var a = 0
    if (optCodeLength > 2) {
      optCode = Number(optCodeSplit[optCodeLength - 2] + optCodeSplit[optCodeLength - 1])
      c = Number(optCodeSplit[optCodeLength - 3])
      b = Number(optCodeSplit[optCodeLength - 4])
      a = Number(optCodeSplit[optCodeLength - 5])
    }

    if (isNaN(a)) {
      a = 0
    }
    if (isNaN(b)) {
      b = 0
    }
    if (isNaN(c)) {
      c = 0
    }

    var second = input[i + 1]
    var third = input[i + 2]
    var last = input[i + 3]

    switch (optCode) {
      case 1:
        input[last] = getValueOrPos(c, second, input) + getValueOrPos(b, third, input)
        increaseValue = 4
        break
      case 2:
        input[last] = getValueOrPos(c, second, input) * getValueOrPos(b, third, input)
        increaseValue = 4
        break
      case 3:
        input[second] = 1
        increaseValue = 2
        break
      case 4:
        console.log(getValueOrPos(c, second, input))
        increaseValue = 2
        break
      case 99:
        i = input.length
        break
      default:
        throw new Error(`unexpected opcode ${optCodeSplit.join('')}`)
    }
  }
  return 'Displayed above'
}
