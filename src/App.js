import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RoutesConfig from './RoutesConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Navbar />

      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <RoutesConfig setProgress={setProgress} />
    </div>
  );
};

export default App;
