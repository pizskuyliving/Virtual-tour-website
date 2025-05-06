import React from "react";

const Panorama360 = ({imagePath}) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src={imagePath}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Panorama360;
