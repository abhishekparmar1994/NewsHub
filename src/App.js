import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
 
  render() {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/general" element={<News pageSize={10} countryCode="us" category="general" key="general" />} />
          <Route exact path="/business" element={<News pageSize={10} countryCode="us" category="business" key="business"/>} />
          <Route exact path="/entertainment" element={<News pageSize={10} countryCode="us" category="entertainment" key="entertainment"/>} />
          <Route exact path="/science" element={<News pageSize={10} countryCode="us" category="science" key="science"/>} />
          <Route exact path="/health" element={<News pageSize={10} countryCode="us" category="health" key="health"/>} />
          <Route exact path="/sports" element={<News pageSize={10} countryCode="us" category="sports" key="sports"/>} />
          <Route exact path="/technology" element={<News pageSize={10} countryCode="us" category="technology" key="technology"/>} />
        </Routes>
      </div>
    )
  }
}
