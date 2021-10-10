import React from 'react';
import Home from './components/Home';
import Navbar from './components/NavBar';
import { JsonProvider } from './context/jsonContext';

function App() {



  return (
    <JsonProvider>
      <Navbar></Navbar>
      <Home />
    </JsonProvider>

  );
}

export default App;
