import api from ".";

const signUp = async (username: string, password: string) => {
    const response = await api.post('/users', { username, password });
    return response.data;
};

const signIn = async (username: string, password: string) => {
    const response = await api.post('/token', { username, password });
    return response.data;
};

export { signIn, signUp };
