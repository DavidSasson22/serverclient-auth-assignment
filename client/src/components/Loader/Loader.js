import React, { useEffect } from "react";
import "./loader.css";

export default function Loader() {
  useEffect(() => {
    console.log("Loader did mount");
  }, []);
  return (
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
