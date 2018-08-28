import React, { Component } from 'react';
import GroBar from './GroBar';


class App extends Component {
  state = {
    gameWater1CheckPointAdds: 0,
    gameWater2CheckPointAdds: 0,
    gameWater3CheckPointAdds: 0,
    gameWater4CheckPointAdds: 0,
    germinationWaterAdds: 0,
    propagationWaterAdds: 0,
    gamepHCheckPointAdds: 0,
    gamePesticideCheckPointAdds: 0,
    gameLightCheckPointAdds: 0,
    stage: 'Germination'
  }

  gamecheck = (stage) => {
    this.setState({
      stage: stage
    })
  }

  gameCheckPointUpdate = (checkpoint) => {
    const update = {}
    update[checkpoint] = this.state[checkpoint] + 1
    this.setState(
      update
      )
  }

  germinationAdds = () => {
    let germinationWaterAdditions = this.state.gameWater1CheckPointAdds + this.state.gameWater2CheckPointAdds + this.state.gameWater3CheckPointAdds + this.state.gameWater4CheckPointAdds
    this.setState({
      germinationWaterAdds: germinationWaterAdditions
    })
  }

  propagationAdds = () => {
    let propagationWaterAdditions = this.state.gameWater1CheckPointAdds + this.state.gameWater2CheckPointAdds + this.state.gameWater3CheckPointAdds + this.state.gameWater4CheckPointAdds
    this.setState({
      propagationWaterAdds: propagationWaterAdditions
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <GroBar
          germinationAdds={this.germinationAdds}
          propagationAdds={this.propagationAdds}
          gameCheckPointUpdate={this.gameCheckPointUpdate}
          gamecheck={this.gamecheck}
          gameData={this.state}
        />
      </div>
    );
  }
}

export default App;
