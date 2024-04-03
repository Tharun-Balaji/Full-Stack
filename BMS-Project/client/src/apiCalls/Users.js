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