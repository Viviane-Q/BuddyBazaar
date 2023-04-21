import {BACKEND_URL} from "@env";

const login = async (email, password) => {
    console.log(`login: ${email} ${password}`);
    const response = await fetch(`${BACKEND_URL}/signin`, {
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
    const response = await fetch(`${BACKEND_URL}/register`, {
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
