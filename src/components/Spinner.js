import React from 'react';
import loading from '../assets/loading.gif';

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="loading" style={{ width: '20%', height: '20%' }} />
    </div>
  );
};

export default Spinner;
