import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import useLocalStorage from '../hooks/UseLocalStorage.jsx'

const Home = () => {
    const { signOut } = useAuth();
    const [user, setUser] = useLocalStorage("user", null);


    return (
        <div>
            Home
            <button onClick={signOut}>Sign out</button>
        </div>
    )
}

export default Home