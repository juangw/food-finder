import config from './config.js';
import dotenv from 'dotenv';
import _ from 'lodash';

dotenv.config();


class ConfigManager {
  /**
   * @constructor
   */
  constructor() {
    this.config = config;
    this.get = this.get.bind(this);
  }

  /**
   * Return a config key or the default value asynchronously
   * @param {String} key
   * @param {Any} defaultValue
   */
  async get(key, defaultValue) {
    if (!_.isUndefined(process.env[key])) {
      return process.env[key];
    }
    if (!_.isUndefined(this.config[key])) {
      return this.config[key];
    }
    return defaultValue;
  }
}

const cm = new ConfigManager();

export default cm;
