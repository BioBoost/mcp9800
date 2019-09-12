# MCP9800 Temperature Sensor Library

NodeJS Driver library for the MCP9800 temperature sensor. Currently only tested on the Raspberry Pi 3.

## Dependencies

This library makes use of:

* [i2c-bus](https://www.npmjs.com/package/i2c-bus) to communicate with i2c devices

## Example

The i2c object needs to be injected via the constructor.

A basic example:

```js
const Mcp9800 = require('mcp9800');
const i2c = require('i2c-bus');

const i2c1 = i2c.open(1, (err) => {
  if (err) throw err;
  console.log("Opened i2c bus successfully");

  let tempSensor = new Mcp9800(i2c1);
  tempSensor.resolution(3);
  setInterval(() => {
    console.log(`Temperature: ${tempSensor.temperature()}°C`);
  }, 250);
});
```
