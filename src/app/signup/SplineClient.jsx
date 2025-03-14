"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Spline on the client side
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

// Error boundary component to catch and log errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", padding: "1rem", border: "1px solid red" }}>
          <h3>Error loading Spline component:</h3>
          <pre>{this.state.error && this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SplineClient({ scene }) {
  useEffect(() => {
    console.log("SplineClient mounting with scene:", scene);
  }, [scene]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ErrorBoundary>
        <Spline scene={scene} />
      </ErrorBoundary>
    </div>
  );
}
