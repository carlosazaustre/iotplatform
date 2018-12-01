# iotplatform-mqtt

## Usage

### `agent/connected`

```js
{
  agent: {
    uuid, // self-generated
    username, // define by config
    name, // define by config
    hostname, // get from OS
    pid // get from process
  }
}
```

### `agent/disconnected`

```js
{
  agent: {
    uuid
  }
}
```

### `agent/message`

```js
{
  agent,
  metrics: [],
  timestamp // generated in message creation
}
```