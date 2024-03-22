import axios from 'axios';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    token: string | null,
    userId: number | null,
    spaces: Array<any>,
    setToken: (token: string, userId: number) => void,
    logout: () => void,
    isAuth: boolean,
    fetchSpaces: () => Promise<void>,
}

export const useAuthStore = create(persist<State>(
    (set, get) => ({
        token: null,
        userId: null,
        isAuth: false,
        spaces: [],
        setToken: (token: string, userId: number) => set((state) => ({
            token,
            userId,
            isAuth: true
        })),
        logout: () => set(state => ({
            token: "",
            userId: null,
            isAuth: false,
        })),
        fetchSpaces: async () => {
            const token = get().token;
            if (token) {
                try {
                    const response = await axios.get("http://localhost:5000/api/spaces", { headers: { "token": token } });
                    set({ spaces: response.data.data }); // Adjust according to your API response structure
                } catch (error) {
                    console.error("Error fetching spaces:", error);
                }
            }
        },
    }), {
    name: "auth"
}));
