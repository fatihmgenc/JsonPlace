import React from 'react';
import Home from './components/Home';
import Navbar from './components/NavBar';
import { JsonProvider } from './context/jsonContext';
import LoadingOverlay from 'react-loading-overlay';

function App() {



  return (
    <JsonProvider>
      <LoadingOverlay
        spinner
        text='Loading your content...'
      >
        <Navbar></Navbar>
        <Home />
      </LoadingOverlay>
    </JsonProvider>

  );
}

export default App;
