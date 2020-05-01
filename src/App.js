import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import request from 'superagent';
import Register from './register';
import Login from './login';
import CreateGroup from './create-group';

import NotFoundPage from './not-found';
import styled from 'styled-components';

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
          <Route path=''>
            <Login />
          </Route>
        </Switch>
      </Router>
    </Page>
  );
};

export default () => <App />;
// function App() {
//   return (
//     <div className='App'>
//       <div class='container'>
//         <div class='row'>
//           <div class='col-sm'>One of three columns</div>
//           <div class='col-sm'>One of three columns</div>
//           <div class='col-sm'>One of three columns</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
