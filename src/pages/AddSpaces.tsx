import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

function AddSpaces() {
    const [name, setName] = useState("");
    const userId = useAuthStore(state => state.userId);
    const token = useAuthStore(state => state.token);
    const fetchSpaces = useAuthStore(state => state.fetchSpaces);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const requestBody = {
                userId: userId,
                name: name
            }
            const config = {
                headers: { "token": token }
            }
            await axios.post('http://localhost:5000/api/spaces', requestBody, config);
            alert("Espacio agregado")
            fetchSpaces();
        } catch (error) {
            //@ts-ignore
            if (error.response) {
                console.log(error);
                //@ts-ignore
            } else if (error.request) {
                console.log(error);
            }
            console.error("Login error:", error);
        }
    }
    
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex flex-col w-full">
                <p className="text-center text-3xl font-bold mb-5">Agregar nuevo espacio</p>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Space 1" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
            </form>
        </div>
    )
}

export default AddSpaces