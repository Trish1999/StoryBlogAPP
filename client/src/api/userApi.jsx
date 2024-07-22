import axios from "axios";

const backendUrl = `https://story-blog-appvercelapp-trish1999s-projects.vercel.app/api/v1/user`;

export const registerUser = async ({ userName, password }) => {
    try {
        const reqUrl = `${backendUrl}/register`;
        const response = await axios.post(reqUrl, {
            userName,
            password,
        });
        return (response);
    } catch (error) {
        alert(error.response.data.errorMessage);
    }
};

export const loginUser = async ({ userName, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl, {
            userName,
            password,
        });
        if (response.data?.token) {
            localStorage.setItem("token", JSON.stringify(response.data?.token));
            localStorage.setItem("userName", (response.data?.userName));
            localStorage.setItem(
                "userId",
                (response.data?.userId)
            );
        }
        return true;
        
    } catch (error) {
         alert(error.response.data.errorMessage);
    }
};