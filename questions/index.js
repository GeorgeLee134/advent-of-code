const fs = require('fs')
const questionsDir = './questions'
var modules = {
  avaliableYears: []
}

const load = () => {
  try {
    const years = fs.readdirSync(questionsDir)
    for (var y = 0; y < years.length; y++) {
      const year = years[y]
      if (/\.js/.test(year)) {
        continue
      }
      var avaliableYear = { name: year, avaliableDays: [] }
      const days = fs.readdirSync(`${questionsDir}/${year}`)
      for (var d = 0; d < days.length; d++) {
        const day = days[d]
        var avaliableDay = { name: day, avaliableParts: [] }

        var files = fs.readdirSync(`${questionsDir}/${year}/${day}`)
        files = files.filter(f => /[a-z]*\.js/.test(f))
        for (var f = 0; f < files.length; f++) {
          const file = files[f]
          if (file !== '1.js' && file !== '2.js') {
            continue
          }
          var part = file.replace('.js', '')
          var text
          if (fs.existsSync(`${questionsDir}/${year}/${day}/${part}desc.info`)) {
            text = fs.readFileSync(`${questionsDir}/${year}/${day}/${part}desc.info`, 'utf-8')
          }

          avaliableDay.avaliableParts.push({ name: part, solution: require(`./${year}/${day}/${file}`), desc: text })
        }
        avaliableYear.avaliableDays.push(avaliableDay)
      }
      modules.avaliableYears.push(avaliableYear)
    }
  } catch (e) {
    // nothing
    console.error(e)
  }
}

load()

module.exports = modules
