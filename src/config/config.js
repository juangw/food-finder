const env = process.env.ENV;
import * as prodSettings from './prod.js';
import * as localSettings from './local.js';

let config = null;

switch(env) {
  case 'prod':
    config = Object.assign({}, prodSettings.config);
    break;
  case 'local':
    config = Object.assign({}, localSettings.config);
    break;
  default:
    throw new Error("process.env.ENV must be {prod|local}");
    break;
}

export default config;
