import axios from "axios";
import { SetPosts } from "../redux/postSlice";

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

export const handleFileUpload = async (uploadFile) => { 

  // create form data
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "socialmedia");

  try {
    
    // upload image
    const response = axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
      formData
    );

    return response.data.secure_url;

  } catch (error) {
    
    console.log(error);

  }

};

export const fetchPosts = async ({ token, dispatch, uri, data }) => { 
  
  try {
    // get posts
    const res = await apiRequest({
      url: uri || "/posts",
      method: "POST",
      token,
      data: data || {},
    });

    // set posts
    dispatch(SetPosts(res?.data));
    return;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async ({ uri, token }) => { 

  try {
    
    const res = await apiRequest({
      url: uri,
      method: "POST",
      token,
    });

    return res;

  } catch (error) {
    console.log(error)
  }

};

