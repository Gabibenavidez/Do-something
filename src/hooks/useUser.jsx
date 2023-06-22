import { useContext, useEffect } from "react";
import { ErrorContext } from "../context/errorContext";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


export const useUser = () => {
  const { setError, setErrorMessage, setLoading, loading } = useContext(ErrorContext);
  const { user, setUser, setIsLogged } = useContext(UserContext);
  const navigate = useNavigate();

  // Login
  const loginUser = async (userData) => {
    setLoading(true); 
    //encrypting password
    const encoder = new TextEncoder();
    const data = encoder.encode(userData.password);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    const encryptedPassword = Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    if (
      userData.email === user?.email &&
      encryptedPassword === user?.password
    ) {
      setErrorMessage("Log in successful!");
      setError(true);
      setIsLogged(true);
      navigate('/home')
    } else {
      setErrorMessage("Invalid username or password");
      setError(true);
    }
    setLoading(false);
  };


  // Update user data and save to localStorage
  const updateUser = async (userData) => {
    setLoading(true); 
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(userData.password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const encryptedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

      setUser({ ...userData, password: encryptedPassword });
      localStorage.setItem(
        'user',
        JSON.stringify({ ...userData, password: encryptedPassword })
      );
      setErrorMessage('Welcome! Please log in');
      setError(true)
    } catch (error) {
      console.error(error);
      setErrorMessage('Error encrypting password:')
      setError(false);
    }
    setLoading(false); 
  };


  // Clear user data 
  /*
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsLogged(false);
  };*/

  // Load user data from localStorage on component mount
  useEffect(() => {
    setLoading(true); 
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); 
  }, []);
  

  return {
    //clearUser,
    updateUser,
    loginUser,
  };
};
