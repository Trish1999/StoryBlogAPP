import axios from "axios";
const backendUrl = `http://localhost:3000/api/v1/post`;

export const createPost = async (postPayload) => {
    try {
        const reqUrl = `${backendUrl}/create`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = axios.post(reqUrl, postPayload);
        window.location.reload(false)
    } catch (error) {
        console.log(error.isTokenExpired);
        alert("Something went wrong");
    }
};

export const getPostByCategory = async (category, userId) => {
    try {
        const reqUrl = `${backendUrl}/post/${category}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};
export const getPostByUser = async (userName, userId) => {
    try {
        const reqUrl = `${backendUrl}/post/${userName}/${userId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

export const updatePostByUser = async (userName, updatedFormData) => {
    try {
        const reqUrl = `${backendUrl}/update/${userName}`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl, updatedFormData);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

export const getAllPosts = async () => {
    try {
        const reqUrl = `${backendUrl}/all`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};