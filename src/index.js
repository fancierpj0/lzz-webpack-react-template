import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';

//test babel-compile
let b = (a, b) => {
  return a + b;
};

b(4, 5);

//test webpack.DefinePlugin
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('IS_DEV:', IS_DEV)

function render() {
  ReactDOM.render((
    <Router>
      <App>
        <Route path='/' component={() => <div>home</div>}></Route>
        <Route path='/other' component={() => <div>other</div>}></Route>
      </App>
    </Router>
  ), window.root);
}

render();

if (module.hot && IS_DEV) {

  // module.hot.accept('./store',() => {
  //   render();
  // });

  module.hot.accept(() => {
    render();
  });
}
