'use strict'

const db = require('../')
const { handleFatalError } = require('../../errors')

async function run () {
  const config = {
    database: process.env.DB_NAME || 'iotplatform',
    username: process.env.DB_USER || 'iotplatform',
    password: process.env.DB_PASS || 'iotplatform',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }

  const { Agent, Metric } = await db(config).catch(handleFatalError)

  const agent = await Agent.createOrUpdate({
    uuid: 'vvv',
    name: 'test',
    username: 'test',
    hostname: 'test',
    pid: 1,
    connected: true
  }).catch(handleFatalError)

  console.log('---- agent ----')
  console.log(agent)

  const agents = await Agent.findAll().catch(handleFatalError)
  console.log('---- agents ----')
  console.log(agents)

  const metrics = await Metric.findByAgentUuid(agent.uuid).catch(handleFatalError)
  console.log('----metrics----')
  console.log(metrics)

  const metric = await Metric.create(agent.uuid, {
    type: 'memory',
    value: 300
  }).catch(handleFatalError)
  console.log('----metric----')
  console.log(metric)

  const metricsByType = await Metric.findByTypeAgentUuid('memory', agent.uuid).catch(handleFatalError)
  console.log('----metrics by type----')
  console.log(metricsByType)
}

run()
