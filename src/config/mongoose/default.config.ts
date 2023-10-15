import { isProduction } from "../envs/index";

let connectionUrl = "mongodb://127.0.0.1:27017/";
if (isProduction) {
  connectionUrl = "mongodb+srv://albertkrug:4lf3mDEvtxAA34I4@cluster0.0yvqkam.mongodb.net/quotes?retryWrites=true&w=majority";
}

export default {
  id: "quotes",
  url: process.env.DEFAULT_URL || connectionUrl,
  connectionOptions: {}
};
