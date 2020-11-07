import config from "./config";
import dotenv from "dotenv";
import _ from "lodash";

dotenv.config();


class ConfigManager {
  config: object | any;
  /**
   * @constructor
   */
  constructor() {
    this.config = config;
    this.get = this.get.bind(this);
  }

  /**
   * Return a config key or the default value
   * @param {String} key
   * @param {Any} defaultValue
   */
  get(key: string, defaultValue: any = null): string | undefined {
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
