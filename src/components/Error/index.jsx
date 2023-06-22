import React, { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../context/errorContext";
import "../../components/Error/styles/error.scss";

const ErrorComponent = () => {
  const { errorMessage, setError } = useContext(ErrorContext);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 1300)
  }, [errorMessage, setError])

  const handleClose = () => {
    setError(false);
  };

  return (
    <div className="error-container">
      <div className="error-modal">
        <h2>Message</h2>
        <p>{errorMessage}</p>
        <button className="close-button" onClick={handleClose}>
        </button>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default ErrorComponent;
