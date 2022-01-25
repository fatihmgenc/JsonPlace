import { React, useContext, useEffect } from 'react';
import Home from './components/Home';
import Navbar from './components/NavBar';
import LoadingOverlay from 'react-loading-overlay';
import { JsonContext } from './context/jsonContext';
import parseJwt from "./common/ParseHelpers";


function App() {

  const { contextState, contextStateActions } = useContext(JsonContext)
  useEffect(() => {
    if (!contextState.token || parseJwt(contextState.token)?.exp < new Date().getTime() / 1000) {
      contextStateActions.setAuthorizedUser(null);
      contextStateActions.setUserTemplates([]);
    }
  }, [])


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
