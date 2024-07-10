import express from "express";
import cors from "cors";
import config from "./config";
import router from "./router";
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port} `);
});
