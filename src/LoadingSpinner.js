import React from "react";
import "./spinner.css";

// Loading Spinner - show when data is loading
export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
