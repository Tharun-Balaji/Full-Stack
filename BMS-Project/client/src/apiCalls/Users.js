import {axiosInstance} from "./index";

export async function RegisterUser(payLoad){
    try {
        const response = await axiosInstance.post("/register",payLoad);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function LoginUser(payLoad){
    try {
        const response = await axiosInstance.post("/login",payLoad);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getCurrentUser(payLoad){
    try {
        const response = await axiosInstance.get("/get-current-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}