import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import SimpleModal from '../components/SimpleModal';

function SpaceDetails() {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    const [spaceDetails, setSpaceDetails] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const fetchSpaceDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/spaces/${id}/cards`, {
                headers: { "token": token }
            });
            setSpaceDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching space details:', error);
            setSpaceDetails([]);
        }
    };

    useEffect(() => {
        fetchSpaceDetails();
    }, [id, token]);

    if (!spaceDetails) return <div>Loading...</div>

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("title", title);
        formData.append("description", description);
        if (file) {
            formData.append('file', file);
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'token': token,
            },
        };
        try {
            await axios.post(`http://localhost:5000/api/spaces/${id}/cards`, formData, config);
            setModalOpen(false);
            fetchSpaceDetails();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const openFile = async (cardId: any) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/card/${cardId}/file`, {
                responseType: 'blob', // Important to get the file as a Blob
                headers: { "token": token }
            });
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } catch (error) {
            console.error('Error opening file:', error);
        }
    };
    

    return (
        <>
            <div className='flex flex-row items-center gap-5'>
                <p className='text-2xl font-bold'>Informacion</p>
                <button onClick={() => setModalOpen(true)} className="text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-md mt-2">Agregar</button>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {spaceDetails.map((detail: any) => (
                    <div key={detail.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{detail.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{detail.description}</p>
                        <button onClick={() => openFile(detail.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Ver documento
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>


            <SimpleModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-bold mb-4 text-white">Agregar nuevos detalles</h2>
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Titulo</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Descripcion</label>
                        <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="textarea bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="block mb-2 text-sm font-medium text-white">Documento</label>
                        <input id="file" type="file" accept="application/pdf" onChange={(e: any) => setFile(e?.target?.files[0])} required className='text-white' />
                    </div>

                    <button type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subir</button>
                </form>
            </SimpleModal>
        </>
    )
}

export default SpaceDetails