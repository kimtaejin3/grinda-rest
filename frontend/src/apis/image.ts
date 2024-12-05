import api from "."

const getAllImages = async () => {
    const response = await api.get('/images')
    return response.data;
}

export { getAllImages }
