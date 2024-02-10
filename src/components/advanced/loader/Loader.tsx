"use client";
import React, { useState, useEffect } from "react";

// Styles
import Style from "./Loader.module.css";

type LoaderProps = {
  children: React.ReactNode;
};

const Loader: React.FC<LoaderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (loading) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className={Style.loaderWrapper}>
      {loading && (
        <div className={Style.loaderContainer}>
          <LoaderComponent />
        </div>
      )}
      <div className={loading ? Style.hidden : ""}>{children}</div>
    </div>
  );
};

const LoaderComponent: React.FC = () => {
  return <div className={Style.loader}></div>;
};

export default Loader;
