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

  resolution(bits) {
    if (bits >= 1 && bits <= 4) {
      let config = this.i2c.readByteSync(this.devAddress, registers.CONFIG);
      this.i2c.writeByteSync(this.devAddress, registers.CONFIG, this.replace_resolution_in_config(config, bits));
    }
  }

  //////////////////////
  // Internal methods //
  //////////////////////

  replace_resolution_in_config(originalConfig, resolutionBits) {
    return (originalConfig & (~(0x03 << 5))) | ((resolutionBits-1) << 5);
  }

}

module.exports = Mcp9800;