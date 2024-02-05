import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../css/loader.css'
import URL from '../server_url';
import { toast } from 'react-toastify';

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            axios.post( URL + '/auth', {token: token}).then((res) => {
                if(res.data.user && res.data.newToken) {
                    localStorage.setItem('token', res.data.newToken)
                    navigate('/user', {state: res.data.user});
                }
                else {
                    navigate('/login', {replace: true})
                }
            }).catch((er) => {
                console.log(er);
                localStorage.clear();
                toast.warning('Session expired', {pauseOnHover: false, autoClose: 1000});
                navigate('/login', {replace: true})
            })
        }
        else {
            navigate('/login', {replace: true})
        }
        
    },[navigate])

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black'}}>
            <div className="loader">
                <div className="white"></div>
                <div className="white"></div>
                <div className="white"></div>
                <div className="white"></div>
            </div>
        </div>
    )
}

export default Home