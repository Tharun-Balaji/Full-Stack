import {axiosInstance} from "./index";

export async function RegisterUser(payLoad){
    try {
        const response = await axiosInstance.post("/api/user/register",payLoad);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function LoginUser(payLoad){
    try {
        const response = await axiosInstance.post("/api/user/login",payLoad);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getCurrentUser(payLoad){
    try {
        const response = await axiosInstance.get("/api/user/get-current-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}