<template>
  <div>
    <iot-agent
      uuid="dd9b2f43-bc96-483a-84b9-023c3ef29acb"
      :socket="socket">
    </iot-agent>
    <iot-agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid"
      :socket="socket">
    </iot-agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
const request = require('request-promise-native')
const io = require('socket.io-client')
const { config } = require('iotplatform-utils')

const IotAgent = require('./agent.vue')
const IotMetric = require('./metric.vue')
const socket = io()

module.exports = {
  name: 'app',
  components: { IotAgent, IotMetric },
  data () {
    return {
      agents: [],
      error: null,
      socket
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    async initialize () {
      const options = {
        method: 'GET',
        url: `${config.proxy.serverHost}/agents`,
        json: true
      }

      let result
      try {
        result = await request(options)
      } catch (err) {
        this.error = err.error.error
        return
      }

      this.agents = result

      socket.on('agent/connected', payload => {
        const { uuid } = payload.agent
        const existing = this.agents.find(a => a.uuid === uuid)
        if (!existing) {
          this.agents.push(payload.agent)
        }
      })
    }
  }
}
</script>

<style>
body {
  font-family: Arial;
  background: #f8f8f8;
  margin: 0;
}
</style>

