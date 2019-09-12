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
