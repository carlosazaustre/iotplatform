'use strict'

const debug = require('debug')('iotplatform:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your Database. Are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happended :)')
  }

  const config = {
    database: process.env.DB_NAME || 'iotplatform',
    username: process.env.DB_USER || 'iotplatform',
    password: process.env.DB_PASS || 'iotplatform',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)
  console.log(`${chalk.green('success!')}`)
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
