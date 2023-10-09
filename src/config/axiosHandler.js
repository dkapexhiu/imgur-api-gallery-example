import axios from "axios";

const clientId = "";

const baseUrl="https://api.imgur.com/3"
axios.defaults.baseURL ="https://api.imgur.com/3"
axios.defaults.headers.common["Authorization"] = `Client-ID ${clientId}`;

export const mainAxios = axios.create({
  baseUrl,
});