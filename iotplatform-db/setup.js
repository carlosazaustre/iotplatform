'use strict'

const debug = require('debug')('iotplatform:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const minimist = require('minimist')
const db = require('./')

const config = require('../config')
const { handleFatalError } = require('../errors')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()

async function setup () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your Database. Are you sure?'
      }
    ]).catch(handleFatalError)

    if (!answer.setup) {
      return console.log(`${chalk.blue('Nothing happended :)')}`)
    }
  }

  config.db.setup = true
  config.db.logging = function (s) {
    return debug(s)
  }

  await db(config.db).catch(handleFatalError)
  console.log(`${chalk.green('success!')}`)
  process.exit(0)
}

setup()
