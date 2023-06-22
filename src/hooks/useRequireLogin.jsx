import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ErrorContext } from "../context/errorContext";

// custom log in check validation
export const useRequireLogin = () => {
  const navigate = useNavigate();
  const { setErrorMessage, setLoading, setError } = useContext(ErrorContext);


  // Check user logged status
  useEffect(() => {
    setLoading(true);
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged !== "true") {
      navigate('/login');
      setErrorMessage('Please log in.');
      setError(true);
    } else {
      navigate('');
    }
    setLoading(false);
  }, []);
};


