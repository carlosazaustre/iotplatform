# iotplatform-agent

## Usage

```js
const IoTPlatformAgent = require('iotplatform-agent')

const agent = new IoTPlatformAgent({
  interval: 2000
})

agent.connect()

agent.on('agent/message', payload => {
  console.log(payload)
})

setTimeout(() => agent.disconnect(), 20000)
```