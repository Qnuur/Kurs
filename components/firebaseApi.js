import axios from "axios";

const DATABASE_URL = 'https://profiles-16230-default-rtdb.firebaseio.com/';

// Veriyi al
export const getData = async (path) => {
    try {
        const response = await axios.get(`${DATABASE_URL}${path}.json`);
        return response.data;
    } catch (error) {
        console.error("Veri alma hatası:", error);
        throw error;
    }
};

// Veriyi güncelle
export const updateDate = async (path, data) => {
    try {
        await axios.put(`${DATABASE_URL}${path}.json`, data);
    } catch (error) {
        console.error("Veri güncelleme hatası:", error);
        throw error;
    }
};
