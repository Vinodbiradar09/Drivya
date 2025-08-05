
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

export const currentCaptain = async()=>{
    try {
        const response = await axiosInstances.get('/captain/captainProfile');
        return response.data
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const logoutUser = async()=>{
    try {
        const response = await axiosInstances.post('/user/logout');
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null
    }
}

export const logoutCaptain = async()=>{
    try {
        const response = await axiosInstances.post('/captain/logoutCaptain');
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null
    }
}

export const endRide = async(rideId)=>{
    try {
        const response = await axiosInstances.post('/ride/end-ride' , rideId );
        return response.data
    } catch (error) {
        console.error(error.message);
        return null
    }
}

export const handleSuggestions = async(config)=>{
    try {
        const response = await axiosInstances.get('/maps/get-suggestions' , config)
        return response.data;
    } catch (error) {
        console.error(error.message)
        return null
    }
}

export const getFare = async(config)=>{
    try {
        const response = await axiosInstances.get('/ride/get-fare' , config)
        return response.data;
    } catch (error) {
        console.error(error.message);
        return null
    }
}

export const createRideApi = async()=>{
    try {
        const response = await axiosInstances.post('/ride/createRide')
        return response.data
    } catch (error) {
        console.error(error.message);
        return null
    }
}


export const confirmRideApi = async()=>{
    try {
      const response = await axiosInstances.post("/ride/confirm")
      return response.data  
    } catch (error) {
        console.error(error.message);
        return null
    }
}