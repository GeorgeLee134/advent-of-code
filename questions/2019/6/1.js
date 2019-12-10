const file = require('../../../util/files')

module.exports = async () => {
  var input = file.getInput(2019, 6)

  const starMap = input.split(/\r?\n/).reduce((map, line) => {
    map[line.split(')')[1]] = line.split(')')[0]
    return map
  }, {})

  const getPathCount = body => body in starMap ? 1 + getPathCount(starMap[body]) : 0

  return Object.keys(starMap).reduce((a, v) => a + getPathCount(v), 0)
}
