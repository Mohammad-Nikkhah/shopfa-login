import axios from "axios";


const BASE_URL = "https://react-mini-projects-api.classbon.com";
export const httpservice = axios.create({
  baseURL: BASE_URL,
});


export const getSystemInfo = async () => {
    const response = await httpservice.get('https://theme-90002.shopfa.com/api/system/info');
    return response.data;
};