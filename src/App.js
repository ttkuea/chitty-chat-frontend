import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import request from 'superagent';
import Register from './register';
import Login from './login';
import CreateGroup from './create-group';
import NotFoundPage from './not-found';
import styled from 'styled-components';
import Chat from './views/chat/chat';
import { StateProvider } from './store/store';

const Page = styled.div`
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  width: 1547px;
  height: 100vh;
  background-color: #a3d1d3;
  color: black;
`;
const Head = styled.div`
  background-color: #323232;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 32px;
`;
const App = () => {
  return (
        <StateProvider>
    <Page>
      <Head>CHITTY CHAT</Head>
      <Router>


          <Switch>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/create-group'>
            <CreateGroup />
          </Route>
          <Route path='/chat'>
              <Chat />
          </Route>
          <Route path=''>
            <Login />
          </Route>
        </Switch>

        
      </Router>
    </Page>
        </StateProvider>
  );
};

export default () => <App />;
