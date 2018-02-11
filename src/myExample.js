import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './myExample.css'

export default class MyExample extends React.Component{
  state={arr:[],i:0};
  increase = () => this.setState({arr:[...this.state.arr,{obj:this.state.i++}]});

  render(){
    console.log(this.state);
    return(
      <div>
        <button onClick={this.increase}>test</button>
        <TransitionGroup>
          {this.state.arr.map(item=>
            <CSSTransition
              key={item.obj}
              classNames={'my-example'}
              timeout={500}
            >
              <span>
                {item.obj}
              </span>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    )
  }
}
