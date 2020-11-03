const env = process.env.ENV;
import * as prodSettings from "./prod";
import * as localSettings from "./local";

let config: object | undefined = {};

switch (env) {
  case "prod":
    config = Object.assign({}, prodSettings.config);
    break;
  case "local":
    config = Object.assign({}, localSettings.config);
    break;
  default:
    throw new Error("process.env.ENV must be {prod|local}");
}

export default config;
