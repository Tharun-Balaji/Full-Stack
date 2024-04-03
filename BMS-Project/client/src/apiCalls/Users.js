import {axiosInstance} from "./index";

export async function RegisterUser(payLoad){
    try {
        const response = await axiosInstance.post("/register",payLoad);
        return response.data;
    } catch (error) {
        return error;
    }
}