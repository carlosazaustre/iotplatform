# iotplatform-db

## Usage

```js
const setupDatabase = require('iotplatform-db')

setupDatabase(config)
  .then(db => {
    const { Agent, Metric } = db
  })
  .catch(err => console.error(err))
```