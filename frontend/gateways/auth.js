import {authURL} from "@env";

const login = async (email, password) => {
    console.log(`login: ${email} ${password}`);
    const response = await fetch(`${authURL}/signin`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    return data;
    };

const register = async (email, password) => {
    console.log(`register: ${email} ${password}`);
    const response = await fetch(`${authURL}/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    return data;
    };

export default {
    login,
    register,
    };
