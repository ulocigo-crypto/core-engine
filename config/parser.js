// parser.js
const debug = require('debug')('core-engine:parser');

class Parser {
  constructor() {
    this.config = null;
  }

  loadConfig(configPath) {
    if (!configPath) {
      throw new Error('configPath is required');
    }

    const fs = require('fs');
    try {
      this.config = require('jsonfile')(configPath);
    } catch (e) {
      debug('Error loading config file: %s', e.message);
      throw e;
    }
  }

  parseConfig() {
    if (!this.config) {
      throw new Error('Config must be loaded first');
    }

    const config = this.config;

    if (!config) {
      throw new Error('Config is empty');
    }

    return config;
  }
}

module.exports = Parser;