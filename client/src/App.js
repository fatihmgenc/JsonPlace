import { React, useContext } from 'react';
import Home from './components/Home';
import Navbar from './components/NavBar';
import LoadingOverlay from 'react-loading-overlay';
import { JsonContext } from './context/jsonContext';



function App() {

  const { contextState, contextStateActions } = useContext(JsonContext)
  console.log(contextState.isLoading, "isLoading");

  return (

    <LoadingOverlay
      spinner
      text='Creating your document...'
      active={contextState.isLoading}
    >
      <Navbar></Navbar>
      <Home />
    </LoadingOverlay>

  );
}

export default App;
