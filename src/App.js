import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RoutesConfig from './RoutesConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoadingBar from "react-top-loading-bar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container d-flex">
        <div style={{ flex: 3 }}>
          <RoutesConfig setProgress={setProgress} />
        </div>
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <Sidebar />
          
        </div>
      </div>
    </div>
  );
};

export default App;

