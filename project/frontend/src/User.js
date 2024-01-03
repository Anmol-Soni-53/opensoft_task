import { useState } from "react"

import Cookies from 'js-cookie';
const User = () => {
    const [userDetails, setUserDetails] = useState({})

    // Function to fetch user data after login

    // const fetchUserData = async () => {
    //     try {
    //         const token = localStorage.getItem('Token');
    //         if (!token) {
    //             throw new Error('Token missing or expired');
    //         }

    //         const response = await fetch('http://127.0.0.1:8000/api/user');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch user data');

    //         }
    //         const userData = await response.json();
    //         console.log('User data:', userData);
    //     } catch (error) {
    //         console.error('Error fetching user data:', error.message);
    //     }
    // };
    // // fetchUserData();

    return (
        <h1>test</h1>
    );
}

export default User;