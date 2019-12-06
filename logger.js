const winston = require('winston')

/**
 * @enum {Integer(0-7)}
 */
const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true
        }),
        winston.format.simple())
    })
  ]
})

logger.log({
  level: 'info',
  message: `
     /$$$$$$          /$$      /$$                    
    /$$__  $$        | $$$    /$$$                    
   | $$  \\__/        | $$$$  /$$$$  /$$$$$$  /$$$$$$$ 
   | $$ /$$$$ /$$$$$$| $$ $$/$$ $$ |____  $$| $$__  $$
   | $$|_  $$|______/| $$  $$$| $$  /$$$$$$$| $$  \\ $$
   | $$  \\ $$        | $$\\  $ | $$ /$$__  $$| $$  | $$
   |  $$$$$$/        | $$ \\/  | $$|  $$$$$$$| $$  | $$
    \\______/         |__/     |__/ \\_______/|__/  |__/
                                                      
                                                      
                                                      
    `
})

module.exports = {
  logger,
  levels
}
