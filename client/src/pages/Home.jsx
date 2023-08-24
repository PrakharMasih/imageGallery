import React, { useEffect } from 'react'
import Photo from '../features/photos/Photo'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate= useNavigate();
    useEffect(() => {
        const check = async () => {
            const auth = localStorage.getItem('auth');
            if (!auth) {
                navigate('/login');
            }
            const response = await fetch('http://localhost:8000/api/posts/', {
                method: 'get',
                headers: new Headers({
                    'Authorization': auth
                }),
            });
            if (response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
        check();
    }, [])

    return (
        <>
            <Photo />
        </>
    )
}

export default Home