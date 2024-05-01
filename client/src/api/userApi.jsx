import axios from "axios";

const backendUrl = `http://localhost:3000/api/v1/user`;

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
            localStorage.setItem("userName", JSON.stringify(response.data?.userName));
            localStorage.setItem(
                "userId",
                JSON.stringify(response.data?.userId)
            );
        }
        return true;
        
    } catch (error) {
         alert(error.response.data.errorMessage);
    }
};