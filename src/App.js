import React from 'react';

export default class App extends React.Component {
  //test hot-module
  state = {
    a: '234'
  };

  render() {
    return (
      <div>
        {this.state.a}
      </div>
    )
  }
}
