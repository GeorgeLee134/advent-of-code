const file = require('../../../util/files')

module.exports = async () => {
  var input = file.getInput(2019, 6)

  const starMap = input.split(/\r?\n/).reduce((map, line) => {
    map[line.split(')')[1]] = line.split(')')[0]
    return map
  }, {})

  var startOrbit = 'YOU'
  var endOrbit = 'SAN'

  console.log(starMap, startOrbit, endOrbit)
}
