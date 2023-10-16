import { isProduction } from "../envs/index";

let connectionUrl: string | undefined;
if (isProduction) {
  connectionUrl = process.env.MONGODB_URI;
} else {
  connectionUrl = "mongodb://127.0.0.1:27017/";
}

export default {
  id: "quotes",
  url: process.env.DEFAULT_URL || connectionUrl,
  connectionOptions: {}
};
