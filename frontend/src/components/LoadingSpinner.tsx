import React from 'react';
import './LoadingSpinner.css'; // Add styles here

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
