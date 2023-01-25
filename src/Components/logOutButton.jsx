import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogOutButton() {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('bestillMediaToken');
        navigate(0);
    }

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <button sytle={{width: 'fit-content'}} onClick={handleClick}>LOG OUT</button>
        </div>
    )
}