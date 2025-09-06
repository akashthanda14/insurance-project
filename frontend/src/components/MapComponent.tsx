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
        title="Mississauga, Ontario, Canada Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps?q=Mississauga,%20Ontario,%20Canada&z=12&output=embed"
      ></iframe>
    </div>
  );
};

export default MapComponent;
