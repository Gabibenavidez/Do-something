
import React, {useContext } from 'react';
import './styles/loading.scss'
import { ErrorContext } from '../../context/errorContext';



const Loading = () => {
  const { loading } = useContext(ErrorContext);
  
  if (!loading) {
    return null;
  }

  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <span className="loading-text">Loading...</span>
    </div>
  );
};

export default Loading;
