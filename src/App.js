import React, { Component } from 'react';
import GroBar from './GroBar';


class App extends Component {
  state = {
    stage: 'Germination'
  }

  gamecheck = (stage) => {
    this.setState({
      stage: stage
    })
  }


  render() {
    console.log(this.state)
    return (
      <div>
        <GroBar gamecheck={this.gamecheck} stage={this.state.stage}/>
      </div>
    );
  }
}

export default App;
