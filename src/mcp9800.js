const registers = {
  TEMPERATURE: 0,
  CONFIG: 1,
  HYSTERESIS: 2,
  LIMIT_SET: 3
};

class Mcp9800 {

  constructor(i2c, devAddress=0x48) {
    this.i2c = i2c;
    this.devAddress = devAddress;
  }

  temperature() {
    let buffer = Buffer.alloc(2, 0x00);
    this.i2c.readI2cBlockSync(this.devAddress, registers.TEMPERATURE, buffer.length, buffer);
    return buffer[0] + (buffer[1]/256.0);
  }

}

module.exports = Mcp9800;