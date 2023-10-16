import { isProduction } from "../envs/index";

let connectionUrl = "mongodb://127.0.0.1:27017/";
if (isProduction) {
  connectionUrl = process.env.MONGODB_URI as string;
}

export default {
  id: "quotes",
  url: process.env.DEFAULT_URL || connectionUrl,
  connectionOptions: {}
};
