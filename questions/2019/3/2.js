const file = require('../../../util/files')

const drawLine = (input, output) => {
  var x = 0
  var y = 0
  var total = 0
  for (var i = 0; i < input.length; i++) {
    var order = input[i]
    var operation = order.substr(0, 1)
    var number = Number.parseInt(order.substring(1, order.length))

    switch (operation) {
      case 'U':
        y += number
        break
      case 'R':
        x += number
        break
      case 'D':
        y -= number
        break
      case 'L':
        x -= number
        break
    }
    total += number
    output.push({
      x,
      y,
      number: total
    })
  }
}

const intersectsLine = (path, lines, intersections) => {
  for (var i = 0; i < lines.length - 1; i++) {
    var linePath = {
      x1: lines[i].x,
      x2: lines[i + 1].x,
      y1: lines[i].y,
      y2: lines[i + 1].y,
      number: lines[i].number
    }
    var intersection = intersect(path.x1, path.y1, path.x2, path.y2, linePath.x1, linePath.y1, linePath.x2, linePath.y2, path.number, linePath.number)

    if (intersection) {
      intersections.push(intersection)
    }
  }
}

const convertToPositive = (input) => {
  if (input < 0) {
    return input * -1
  }
  return input
}

const between = (a, b1, b2) => {
  if ((a > b1 && a < b2) || (a < b1 && a > b2)) {
    return true
  }
  return false
}

const intersect = (x1, y1, x2, y2, x3, y3, x4, y4, number1, number2) => {
  // Check if none of the lines are of length 0
  var number = 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false
  }

  if (x1 === x2) {
    if (y3 === y4) {
      if (between(x1, x3, x4) && between(y3, y1, y2)) {
        number = (number1 + (convertToPositive(x3 - x1))) + (number2 + (convertToPositive(y1 - y3)))
        return { x: x1, y: y3, number }
      }
    }
  }

  if (y1 === y2) {
    if (x3 === x4) {
      if (between(y1, y3, y4) && between(x3, x1, x2)) {
        number = (number1 + (convertToPositive(x1 - x3))) + (number2 + (convertToPositive(y3 - y1)))
        return { x: x3, y: y1, number }
      }
    }
  }

  return false
}

module.exports = () => {
  var inputs = file.getInput(2019, 3)
  inputs = inputs.split('\n').map(i => i.split(','))
  var line1 = [{ x: 0, y: 0, number: 0 }]
  var line2 = [{ x: 0, y: 0, number: 0 }]
  var intersections = []

  drawLine(inputs[0], line1)
  drawLine(inputs[1], line2)
  for (var i = 0; i < line1.length - 1; i++) {
    var linePath = {
      x1: line1[i].x,
      x2: line1[i + 1].x,
      y1: line1[i].y,
      y2: line1[i + 1].y,
      number: line1[i].number
    }
    intersectsLine(linePath, line2, intersections)
  }

  // intersections.splice(0, 3)
  intersections.sort((a, b) => {
    var aValue = a.number
    var bValue = b.number

    if (aValue < bValue) {
      return -1
    }

    if (aValue > bValue) {
      return 1
    }

    return 0
  })

  return intersections[0].number
}
