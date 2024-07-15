import axios from "axios";

// api url
const API_URL = "http://localhost:8800";

// axios instance
export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

// api request
export const apiRequest = async ({ url, method, data, token }) => { 

  try {

    const result = await API(url, { // make api request
      method: method || "GET",
      data: data ,
      headers: {
        "content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // attach token
      }
    });

    return result?.data;

  } catch (error) { 

    // destructure error
    const err = error.response.data;

    console.log(err);

    // return error
    return {
      status: err.success,
      message: err.message,
    }
  }
};

