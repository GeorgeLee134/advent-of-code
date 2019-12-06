// Third Party Stuff
const inquirer = require('inquirer')
const fs = require('fs')
const chalk = require('chalk')
const dotenv = require('dotenv')
dotenv.config()

// My Stuff
// const logger = require('./logger.js').logger
const terminal = require('./util/terminal')
const download = require('./util/files')
const questions = require('./questions')

// Constant stuff
const questionsDir = './questions'

// Setup Stuff
var message = null
const menu = ['Questions', 'Download Descriptions', 'Quit']

const main = async () => {
  var loop = true
  while (loop) {
    terminal.clear()
    if (message != null) {
      console.log(message)
      message = null
    }

    var selectedOption = await inquirer.prompt({
      name: 'menu',
      message: 'What would you like to do?',
      type: 'list',
      choices: menu
    })
    terminal.clear()
    switch (selectedOption.menu) {
      case 'Download Descriptions': {
        let count = 0
        try {
          const years = fs.readdirSync(questionsDir)
          for (var y = 0; y < years.length; y++) {
            const year = years[y]
            const days = fs.readdirSync(`${questionsDir}/${year}`)
            for (var d = 0; d < days.length; d++) {
              const day = days[d]
              if (!fs.existsSync(`${questionsDir}/${year}/${day}/1desc.info`) || !fs.existsSync(`${questionsDir}/${year}/${day}/2desc.info`)) {
                count += await download.downloadDescription(year, day)
              }
            }
          }
        } catch (e) {
          // nothing
        }
        message = chalk.green(`A total of ${count} descriptions downloaded`)
        break
      }
      case 'Questions': {
        var yearResult = await inquirer.prompt({
          name: 'year',
          message: 'Which year?',
          type: 'list',
          choices: questions.avaliableYears.map(ay => ay.name),
          filter (input) {
            return new Promise((resolve) => {
              resolve(questions.avaliableYears.find(ay => ay.name === input))
            })
          }
        })

        var dayResult = await inquirer.prompt({
          name: 'day',
          message: 'Which day?',
          type: 'list',
          choices: yearResult.year.avaliableDays.map(ad => ad.name),
          filter (input) {
            return new Promise((resolve) => {
              resolve(yearResult.year.avaliableDays.find(ad => ad.name === input))
            })
          }
        })

        var partResult = await inquirer.prompt({
          name: 'part',
          message: 'Which part?',
          type: 'list',
          choices: dayResult.day.avaliableParts.map(ad => ad.name),
          filter (input) {
            return new Promise((resolve) => {
              resolve(dayResult.day.avaliableParts.find(ad => ad.name === input))
            })
          }
        })
        terminal.clear()
        var part = partResult.part
        console.log(part.desc)
        console.log(`The answer for ${yearResult.year.name}/${dayResult.day.name}/${partResult.part.name} is ${chalk.red.bgGreen(partResult.part.solution())}`)

        await inquirer.prompt({
          name: 'input',
          message: 'Press any key to return to menu',
          type: 'input'
        })

        break
      }
      case 'Quit': {
        const answer = await inquirer.prompt({
          name: 'quit',
          message: 'Are you sure you want to quit?',
          type: 'confirm'

        })
        if (answer.quit) {
          loop = false
        }
        break
      }
    }
  }
}

if (process.env.RUN_DEBUG) {
  // This is where I just run the shit while I'm working on it!
  console.log(require('./questions/2019/3/2')())
} else {
  main()
}
