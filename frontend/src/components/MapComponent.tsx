import React from 'react';

const MapComponent: React.FC = () => {
  return (
    <div
      style={{
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        overflow: 'hidden',
      }}
    >
      <iframe
        title="St. Lawrence Market Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps?q=St.%20Lawrence%20Market%20Toronto&z=16&output=embed"
      ></iframe>
    </div>
  );
};

export default MapComponent;
