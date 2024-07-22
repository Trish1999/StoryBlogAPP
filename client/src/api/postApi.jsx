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


export const getPostById = async (id) => {
    try {
        const reqUrl = `${backendUrl}/story/${id}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

export const deletePost = async (id) => {
    try {
        const reqUrl = `${backendUrl}/delete/${id}`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.delete(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);

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

export const updatePostById = async (id, postPayload) => {
    try {
        const reqUrl = `${backendUrl}/update/${id}`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl, postPayload);
        return response.data;
    } catch (error) {
        console.log(error);

    }
};