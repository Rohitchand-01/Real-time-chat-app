import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            setError(null); // Reset error state on each request

            try {
                const token = Cookies.get("jwt");
                console.log(token)

                // Ensure token exists before making the request
                if (!token) {
                    setError("No token found. Please log in again.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:3000/user/allusers", {
                    withCredentials: true, // Ensures cookies are sent with the request
                    headers: {
                        Authorization: `Bearer ${token}`, // Sends the JWT token
                    },
                });

                // Logging the response to check if the data is correct
                console.log("Response:", response.data);

                // Checking if the response is in the expected format
                if (response.data && response.data.users && Array.isArray(response.data.users)) {
                    setAllUsers(response.data.users); // Assuming the response has a "users" property
                } else {
                    setAllUsers([]); // In case the response is not in the expected format
                    setError("Unexpected response format: 'users' not found or not an array");
                }

            } catch (err) {
                // More detailed error handling
                console.error("Error fetching users:", err);
                setError(err?.response?.data?.error || err.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []); // Only run once when the component mounts

    return [allUsers, loading, error];
};

export default useGetAllUsers;
