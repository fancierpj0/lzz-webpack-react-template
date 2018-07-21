import React from 'react';

export default class Child extends React.Component{
  state = {
    content:'我是child1'
  }
  render(){
    return (
      <div>
        {this.state.content}
      </div>
    )
  }
}
