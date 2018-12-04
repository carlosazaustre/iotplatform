# iotplatform-agent

## Usage

```js
const IoTPlatformAgent = require('iotplatform-agent')

const agent = new IoTPlatformAgent({
  interval: 2000
})

agent.connect()

// This agent only
agent.on('connected')
agent.on('disconnected')
agent.on('message')

// Other agents
agent.on('agent/connected')
agent.on('agent/disconnected')
agent.on('agent/message', payload => {
  console.log(payload)
})

setTimeout(() => agent.disconnect(), 20000)
```