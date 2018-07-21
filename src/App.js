import React from 'react';
import Child from './Child';

export default class App extends React.Component {
  state = {
    a: '1'
  };

  render() {
    return (
      <div>
        {this.state.a}
        {this.props.children}
        <Child/>
      </div>
    )
  }
}
