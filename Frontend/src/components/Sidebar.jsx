import React, { useState } from 'react'; // Import useState properly
import axios from 'axios'; // Import axios
import Cookies from 'js-cookie'; // Import js-cookie for cookie management
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import power from '../assets/power.png';
import chat from '../assets/chat.png';
import menu from '../assets/menu.png';
import person from '../assets/person.png';
import setting from '../assets/setting.png';

const Sidebar = () => {
  const [loading, setLoading] = useState(false); // Declare loading state
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when logging out
    try {
      const res = await axios.post("http://localhost:3000/user/logout"); // API request to logout
      localStorage.removeItem("ChatApp"); // Remove from localStorage
      Cookies.remove("jwt"); // Remove the JWT cookie
      setLoading(false); // Set loading to false after successful logout
      window.location.reload(); // Reload the page
    } catch (error) {
      console.log(error); // Log errors
      setLoading(false); // Reset loading state on error
    }
  };

  const handleChatClick = () => {
    // Invoke the NoChatSelected function when the chat image is clicked
    NoChatSelected();
  };

  const NoChatSelected = () => {
    
  };

  return (
    <div className="w-[5%] h-full top-0 fixed bg-indigo-500 items-center justify-center p-2">
      <div className="flex flex-col p-3">
        <img 
          className="mb-20 w-[35px]" 
          onClick={handleLogout} 
          src={power} 
          alt="Logout" 
        />
        <img 
          className="mb-4 w-[35px]" 
          onClick={handleChatClick} 
          src={chat} 
          alt="Chat" 
        />
        <img className="mb-4 w-[35px]" src={person} alt="User" />
      </div>
      <div className="mt-[300px] flex flex-col p-3">
        <img className="mb-4 w-[35px]" src={setting} alt="Settings" />
        <img className="mb-4 w-[35px]" src={menu} alt="Menu" />
      </div>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white">
          Logging out...
        </div>
      )}
    </div>
  );
};

export default Sidebar;
