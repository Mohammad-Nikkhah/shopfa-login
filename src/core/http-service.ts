import axios from "axios";

const BASE_URL:string = "https://react-mini-projects-api.classbon.com";
export const httpservice = axios.create({
  baseURL:BASE_URL
})
