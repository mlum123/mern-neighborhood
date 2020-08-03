import React from 'react';
import AppNavbar from './components/AppNavbar'
import NeedsList from './components/NeedsList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <NeedsList />
    </div>
  );
}

export default App;
