import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom'

let a = 234;
console.log(a);

let b = (a, b) => {
  return a + b;
};

b(4, 5);

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('IS_DEV:',IS_DEV)

ReactDOM.render((
  <Router>
    <React.Fragment>
      <Route path='/' component={()=><div>home</div>}></Route>
      <Route path='/other' component={()=><div>other</div>}></Route>
    </React.Fragment>
  </Router>
),window.root)
