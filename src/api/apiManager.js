// api.js

import axios from "axios";

const ApiCompetitionFlowManager = axios.create({
  baseURL: "https://live.showtimedance.eu",
  responseType: "json",
  withCredentials: true,
});

export default ApiCompetitionFlowManager;
