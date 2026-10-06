import React from "react";

const Panorama360 = ({ imagePath, title }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src={imagePath}
        title={title}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
      />
    </div>
  );
};

export default Panorama360;
