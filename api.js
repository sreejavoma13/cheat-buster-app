const API_BASE_URL = 'http://localhost:3000/api';

export async function searchUser(query) {
    return await axios.get(`${API_BASE_URL}/search`, {
        params: { query }
    });
}

