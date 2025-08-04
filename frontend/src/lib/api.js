
import { axiosInstances } from "./axios";

export const userLogin = async(userLoginData)=>{
    try {
        const response = await axiosInstances.post('/user/login' , userLoginData);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null
    }
}

export const captainLogin = async(captainLoginData)=>{
    try {
        const response = await axiosInstances.post('/captain/loginCaptain' , captainLoginData);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null
    }
}

export const currentUser = async()=>{
    try {
        const response = await axiosInstances.get('/user/currentUser');
        return response.data;
    } catch (error) {
         console.error(error.message);
        return null
    }
}