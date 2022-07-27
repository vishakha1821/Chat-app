import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from './firebase';
import { useAuth } from './AuthContext';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Chats = () =>{
const history = useHistory();
const { user } = useAuth();
const [loading, setLoading] = useState(true);


    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async(url)=>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], 'userPhoto.jpeg', {type: 'image/jpeg'})
    }

    useEffect (()=> {
        if(!user) {
         history.push('/');

         return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            header: {
                "project-id": "3813a29a-1b35-4587-923b-807471e8c653",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append('username', user.displayname)
            formdata.append('secret', user.uid)

            getFile(user.photoUrl)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users')
            })
        });
    }, [user, history])
    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Mychat
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>
            <ChatEngine height = 'cal(100vh - 66px)'
            projectId = '3813a29a-1b35-4587-923b-807471e8c653'
            userName = '.'
            userSecret = '.'/>
        </div>
    )
}

export default Chats;