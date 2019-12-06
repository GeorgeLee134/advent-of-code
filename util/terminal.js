const readline = require('readline')

/**
 * Will clear the stdout
 * @returns {void}
 */
const clear = () => {
  const blank = '\n'.repeat(process.stdout.rows)
  console.log(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

module.exports = {
  clear
}
