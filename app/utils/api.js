import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

// time 2 station
export async function getWaitTimeApi(
  lineNumber,
  entryBaseTime,
  exitBaseTime,
  des
) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_URL}/mtehran/getwaitime?lineNumber=${lineNumber}&entry=${entryBaseTime}&exit=${exitBaseTime}&des=${des}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : new Error(error.message);
  }
}

// time 1 station
export async function getStationTimeApi(lineNumber, baseTime1, baseTime2) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_URL}/mtehran/getstatime?lineNumber=${lineNumber}&baseTime1=${baseTime1}&baseTime2=${baseTime2}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : new Error(error.message);
  }
}

// getAllStationsApi
export async function getAllStationsApi() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_URL}/mtehran/all`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : new Error(error.message);
  }
}
