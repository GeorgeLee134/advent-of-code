const logger = require('../logger').logger
const request = require('request-promise')
const HTMLParser = require('node-html-parser')
const tough = require('tough-cookie')
const fs = require('fs')

const questionsDir = './questions'

const urlBase = 'https://adventofcode.com/'
const j = request.jar()
const cookie = new tough.Cookie({
  key: 'session',
  value: process.env.SESSION_VALUE,
  domain: '.adventofcode.com',
  httpOnly: true,
  secure: true
})

j.setCookie(cookie.toString(), urlBase)

/**
 * Will download the description
 * @param {Number} year The year of the problem to download
 * @param {Number} day The day of the problem to donwload
 */
const downloadDescription = async (year, day) => {
  let count = 0
  logger.info(`Requesting description for year ${year} and day ${day}`)
  try {
    var html = await request({
      jar: j,
      url: `${urlBase}${year}/day/${day}`
    })
    const root = HTMLParser.parse(html)

    const parts = root.querySelectorAll('.day-desc')

    for (var p = 0; p < parts.length; p++) {
      fs.writeFileSync(`${questionsDir}/${year}/${day}/${p + 1}desc.info`, parts[p].text)
      count++
    }
  } catch (e) {
    return new Error(`There was an error downloading the description for day ${day} and year ${year}`)
  }
  return count
}

const getInput = (year, day) => {
  return fs.readFileSync(`${questionsDir}/${year}/${day}/input.txt`, 'utf-8')
}

module.exports = {
  downloadDescription,
  getInput
}
