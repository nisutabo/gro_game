import React, { Component } from 'react';

import './index.css';

export default class GroBar extends Component {

    state = {
      started: false,
      waterAdds: 0,
      waterCheckPoint1Adds: 0,
      waterCheckPoint2Adds: 0,
      waterCheckPoint3Adds: 0,
      waterCheckPoint4Adds: 0,
      progress: 1,
      ECLevel: 0,
      pHLevel: 7,
      pHCheckPointAdds:0,
      pesticideLevel: 0,
      pesticideCheckPointAdds: 0,
      DLILevel: 0,
      lightCheckPointAdds: 0,
      plantHeight: 0,
      plantHealth: 100,
      plantAlive: true,
      pests: false
    }

    grow = () => {
      if (!this.state.started){
        this.setState({
          started: true
        })
        this.props.gamecheck('Germination')
        setInterval(this.progress, 80);
      }
    }

    progress = () => {
      let elem = document.getElementById("myBar");
      if (this.state.progress <= 100 && this.state.plantAlive){
        this.setState({
            progress: this.state.progress + 1
          })
        elem.style.width = this.state.progress + '%'
        if ((this.state.progress > 10 && this.state.waterAdds < 1) || (this.state.progress > 40 && this.state.waterAdds < 2) || (this.state.progress > 70 && this.state.waterAdds < 3)){ // if player failed to add water at the appropriate times
          if (this.state.ECLevel > 0.005){ //this is to make sure the ec level never goes below 0
            this.setState({
              ECLevel: this.state.ECLevel - 0.005,
              plantHealth: this.state.plantHealth - 0.3
            })
          } else {
            this.setState({
              plantHealth: this.state.plantHealth - 0.3
            })
          }
        }
        if (this.state.progress > 55 && this.state.pesticideCheckPointAdds < 1){ // if player failed to add pesticide at the appropriate time
          this.setState({
            pests: true,
            plantHealth: this.state.plantHealth - 0.3
          })
        }
        if (this.state.progress > 25 && this.state.pHCheckPointAdds < 1){ // if player failed to add acid at the appropriate time
          this.setState({
            plantHealth: this.state.plantHealth - 0.3
          })
        }
        if (this.props.gameData.stage === 'Propagation' && (this.props.gameData.germinationWaterAdds < 4 || this.props.gameData.germinationpHAdds < 1 || this.props.gameData.germinationPesticideAdds < 1)){
          this.setState({
            plantHealth: this.state.plantHealth - 0.3
          })
        }
        if (this.props.gameData.stage === 'Propagation' && this.props.gameData.germinationWaterAdds < 4){
          this.setState({
            ECLevel: this.state.ECLevel - 0.005
          })
        }
        if (this.props.gameData.stage === 'Propagation' && this.state.progress > 25 && (this.props.gameData.germinationpHAdds + this.state.pHCheckPointAdds) < 2){
          if (this.state.pHLevel < 7){
            this.setState({
              pHLevel: this.state.pHLevel + 0.005
            })
          }
        }
        if (this.props.gameData.stage === 'Propagation' && this.state.progress > 55 && (this.props.gameData.germinationPesticideAdds + this.state.pesticideCheckPointAdds) < 2){
          if (this.state.pesticideLevel > 0){
            this.setState({
              pesticideLevel: this.state.pesticideLevel - 0.005
            })
          }
        }
        if (this.props.gameData.stage === 'Propagation' && this.state.progress > 85 && (this.props.gameData.germinationLightAdds + this.state.lightCheckPointAdds) < 2){
          if (this.state.DLILevel > 10){
            this.setState({
              DLILevel: this.state.DLILevel - 0.05
            })
          }
        }
        if (this.props.gameData.stage === 'Production' && (this.props.gameData.propagationWaterAdds < 8 || this.props.gameData.propagationpHAdds < 2 || this.props.gameData.propagationPesticideAdds < 2)){
          this.setState({
            plantHealth: this.state.plantHealth - 0.3
          })
        }
        if (this.props.gameData.stage === 'Production' && this.props.gameData.propagationWaterAdds < 8){
          this.setState({
            ECLevel: this.state.ECLevel - 0.005
          })
        }
        if ((this.props.gameData.stage === 'Production' && this.props.gameData.propagationpHAdds < 2) || (this.props.gameData.stage === 'Production' && this.state.progress > 25 && (this.props.gameData.propagationpHAdds + this.state.pHCheckPointAdds) < 3)){
          if (this.state.pHLevel < 7){
            this.setState({
              pHLevel: this.state.pHLevel + 0.005
            })
          }
        }
        if ((this.props.gameData.stage === 'Production' && this.props.gameData.propagationPesticideAdds < 2) || (this.props.gameData.stage === 'Production' && this.state.progress > 55 && (this.props.gameData.propagationPesticideAdds + this.state.pesticideCheckPointAdds) < 3)){
          if (this.state.pesticideLevel > 0){
            this.setState({
              pesticideLevel: this.state.pesticideLevel - 0.005
            })
          }
        }
        if ((this.props.gameData.stage === 'Production' && this.props.gameData.propagationLightAdds < 2) || (this.props.gameData.stage === 'Production' && this.state.progress > 85 && (this.props.gameData.propagationLightAdds + this.state.lightCheckPointAdds) < 3)){
          if (this.state.DLILevel > 10){
            this.setState({
              DLILevel: this.state.DLILevel - 0.05
            })
          }
        }
        if (this.state.plantHealth < 50){ // if plant health falls below 50% the plant dies
            if(this.state.plantAlive){
              this.setState({
                plantAlive: false
              })
              alert('Your Plant has died :(')
            }
        }
      }
        if (this.state.progress === 100 && this.props.gameData.stage === 'Germination'){
          this.props.germinationAdds()
          this.props.gamecheck('Propagation')
          this.resetAttributes()
        } else if (this.state.progress === 100 && this.props.gameData.stage === 'Propagation'){
          this.props.propagationAdds()
          this.props.gamecheck('Production')
          this.resetAttributes()
        } else if (this.state.progress === 100 & this.props.gameData.stage === 'Production'){
          this.props.gamecheck('Ready For Harvest')
        }
    }

    resetAttributes = () => {
      this.setState({
        waterAdds: 0,
        waterCheckPoint1Adds: 0,
        waterCheckPoint2Adds: 0,
        waterCheckPoint3Adds: 0,
        waterCheckPoint4Adds: 0,
        progress: 1,
        pHCheckPointAdds:0,
        pesticideCheckPointAdds: 0,
        lightCheckPointAdds: 0,
        plantAlive: true,
        pests: false
      })
    }

    waterCheckPointAdder = (checkpoint) => {
      const attributes = {
        waterAdds: this.state.waterAdds + 1,
        ECLevel: 2.5,
        plantHeight: this.state.plantHeight + 10
      }
      attributes[checkpoint] = this.state[checkpoint] + 1
      this.setState(
        attributes
      )
      if (this.state.plantHealth < 90){
        this.setState({
          plantHealth: this.state.plantHealth + 10
        })
      }
    }

    waterCheckPointOverdose = (checkpoint) => {
      const attributes = {
        waterAdds: this.state.waterAdds + 1,
        ECLevel: 3.5,
        plantHealth: this.state.plantHealth - 5
      }
      attributes[checkpoint] = this.state[checkpoint] + 1
      this.setState(
        attributes
      )
    }

    watercheck = () => {
      if (this.state.started && this.state.progress < 100){ //the game is still on
        if (this.state.ECLevel < 10 && this.state.plantHealth > 1){ // to ensure ec level never exceeds 10, plant height never exceeds 100 and plant health is never less than 1
          if ((this.state.progress >= 0 &&  this.state.progress <= 10) || (this.state.progress >= 30 &&  this.state.progress <= 40) || (this.state.progress >= 60 &&  this.state.progress <= 70) || (this.state.progress >= 90 &&  this.state.progress <= 100)) { // if the player adds water at the appropriate checkpoints
            if (this.state.progress >= 0 && this.state.progress <= 10){ // if player correctly adds water at the first water checkpoint
              if (this.state.waterCheckPoint1Adds === 0){ // if this was the players first add
                this.waterCheckPointAdder('waterCheckPoint1Adds')
                this.props.gameCheckPointUpdate('gameWater1CheckPointAdds')
              } else { // if the player exceeded the required number of water adds (which is one) within this checkpoint
                this.waterCheckPointOverdose('waterCheckPoint1Adds')
              }

            } else if (this.state.progress >= 30 &&  this.state.progress <= 40) {
              if (this.state.waterCheckPoint2Adds === 0){
                this.waterCheckPointAdder('waterCheckPoint2Adds')
                this.props.gameCheckPointUpdate('gameWater2CheckPointAdds')
              } else {
                this.waterCheckPointOverdose('waterCheckPoint2Adds')
              }

            } else if (this.state.progress >= 60 &&  this.state.progress <= 70) {
              if (this.state.waterCheckPoint3Adds === 0){
                this.waterCheckPointAdder('waterCheckPoint3Adds')
                this.props.gameCheckPointUpdate('gameWater3CheckPointAdds')
              } else {
                this.waterCheckPointOverdose('waterCheckPoint3Adds')
              }

            } else if (this.state.progress >= 90 &&  this.state.progress <= 100) {
              if (this.state.waterCheckPoint4Adds === 0){
                this.waterCheckPointAdder('waterCheckPoint4Adds')
                this.props.gameCheckPointUpdate('gameWater4CheckPointAdds')
              } else {
                this.waterCheckPointOverdose('waterCheckPoint4Adds')
              }
            }
          } else { // if the player did not add water at the appropriate checkpoints
            this.setState({
              waterAdds: this.state.waterAdds + 1,
              ECLevel: 2.5,
              plantHeight: this.state.plantHeight + 5,
              plantHealth: this.state.plantHealth - 5
            })
            alert('water added at wrong time')
          }
        }
      }
    }

    pHcheck = () => {
      if (this.state.started && this.state.progress < 100){
        if (this.state.pHCheckPointAdds === 0){ // if first addition of acid

            if (this.state.progress >= 15 &&  this.state.progress <= 25){ // if acid is added at the appropriate interval/checkpoint
              this.setState({
                pHLevel: 5.5,
                pHCheckPointAdds: this.state.pHCheckPointAdds + 1
              })
              this.props.gameCheckPointUpdate('gamepHCheckPointAdds')
            } else if (this.state.progress < 15 && this.state.pHLevel > 1){
              this.setState({
                pHLevel: 5.5,
                plantHealth: this.state.plantHealth - 0.1
              })
             alert('acid added too early')
            }
            else if (this.state.progress > 25 && this.state.pHLevel > 1){
              this.setState({
                pHLevel: 5.5,
                plantHealth: this.state.plantHealth + 1
              })
            alert('acid added too late')
            }

        } else {
          if (this.state.pHLevel > 1  && this.state.plantHealth > 0 && this.state.plantHealth < 100){ // to ensure pH never goes below 1
            this.setState({
              pHLevel: 3.0,
              plantHealth: this.state.plantHealth - 1
            })
          }
        }
      }
    }

    pesticidecheck = () => {
      if (this.state.started && this.state.progress < 100){
        if (this.state.pesticideCheckPointAdds === 0){ // if first addition of pesticide
          if (this.state.progress >= 45 &&  this.state.progress <= 55){
            this.setState({
              pesticideLevel: 4,
              pesticideCheckPointAdds: this.state.pesticideCheckPointAdds + 1
            })
            this.props.gameCheckPointUpdate('gamePesticideCheckPointAdds')
          } else if (this.state.progress < 45){
            this.setState({
              pesticideLevel: 4,
              plantHealth: this.state.plantHealth - 0.5
            })
            alert('pesticide added too early')
          } else if (this.state.progress > 55){
            this.setState({
              pesticideLevel: 4,
              pests: false,
              plantHealth: this.state.plantHealth + 2
            })
            alert('pesticide added too late')
          }
        } else { // this else block will activate if number of pesticide additions exceeds what is required (which is one)
          if (this.state.pesticideLevel < 12 && this.state.plantHealth > 0 && this.state.plantHealth < 100){ //to ensure pesticide never exceeds 12
            this.setState({
              pesticideLevel: 6,
              plantHealth: this.state.plantHealth - 1
            })
            alert('too much pesticide added')
          }
        }
      }
    }

    dlicheck = () => {
      if (this.state.started && this.state.progress < 100){
        if (this.state.lightCheckPointAdds === 0){ // if first addition of light
          if (this.state.progress >= 75 &&  this.state.progress <= 85){
            this.setState({
              DLILevel: 28,
              lightCheckPointAdds: this.state.lightCheckPointAdds + 1,
              plantHeight: this.state.plantHeight + 40
            })
            this.props.gameCheckPointUpdate('gameLightCheckPointAdds')
          } else if (this.state.progress < 75){
            this.setState({
              DLILevel: 28,
              plantHeight: this.state.plantHeight + 10
            })
            alert('light added too early')
          } else if (this.state.progress > 85){
            this.setState({
              DLILevel: 28,
              plantHeight: this.state.plantHeight + 10
            })
            alert('light added too late')
          }
        } else { // this else block will activate if number of additions of light exceeds what is required (which is one)
          if (this.state.DLILevel < 40  && this.state.plantHeight < 100){ // to ensure daily light integral (dli) never exceeds 40 and plant height never exceeds 100
            this.setState({
              DLILevel: 32,
              plantHeight: this.state.plantHeight + 10
            })
            alert('too much light added')
          }
        }
      }
    }

    playAgain = () => {
      window.location.reload()
    }

    seeded = () => {
      if (this.state.started){
        return (
          <div className='unit-display optimal'> Yes </div>
        )
      } else {
        return (
          <div className='unit-display'> No </div>
        )
      }
    }

    eclevel = () => {
      if (this.state.progress >= 100 && this.state.waterAdds === 4 && this.state.waterCheckPoint1Adds === 1 && this.state.waterCheckPoint2Adds === 1 && this.state.waterCheckPoint3Adds === 1 && this.state.waterCheckPoint4Adds === 1 && this.state.ECLevel === 2.5){
        return (<div className='optimal'><span className='number-display'>{this.state.ECLevel.toFixed(3)}</span><span className='unit-display'> EC </span></div>)
      } else {
        return (<div> <span className='number-display'>{this.state.ECLevel.toFixed(3)}</span><span className='unit-display'> EC </span></div>)
      }
    }

    phlevel = () => {
      if (this.state.progress >= 100 && this.state.pHCheckPointAdds === 1 && this.state.pHLevel === 5.5){
        return (<div className='optimal'><span className='number-display '>{this.state.pHLevel.toFixed(1)}</span><span className='unit-display'> pH</span></div>)
      } else {
        return (<div><span className='number-display'>{this.state.pHLevel.toFixed(1)}</span><span className='unit-display'> pH</span></div>)
      }
    }

    pesticidelevel = () => {
      if (this.state.progress >= 100 && this.state.pesticideCheckPointAdds === 1 && this.state.pesticideLevel === 4){
        return (<div className='optimal'><span className='number-display'>{this.state.pesticideLevel.toFixed(1)}</span><span className='unit-display'> mg </span></div>)
      } else  {
        return (<div><span className='number-display'>{this.state.pesticideLevel.toFixed(1)}</span><span className='unit-display'> mg </span></div>)
      }
    }

    dlilevel = () => {
      if (this.state.progress >= 100 && this.state.lightCheckPointAdds === 1 && this.state.DLILevel === 28){
        return (<div className='optimal'><span className='number-display'>{this.state.DLILevel.toFixed(1)}</span><span className='unit-display'> mol m<sup>-2</sup> d<sup>-1</sup></span></div>)
      } else {
        return (<div><span className='number-display'>{this.state.DLILevel.toFixed(1)}</span><span className='unit-display'> mol m<sup>-2</sup> d<sup>-1</sup> </span></div>)
      }
    }

    plantimage = () => {
      let image = (this.state.plantHeight / 10) * 2
      return require(`./assets/plant${image}.jpg`)
    }

  render() {
    return (
      <div>
      <div className='game-header'>
        GRO-GAME
      </div>
        <div id="myProgress">
          <div id="myBar"></div>
          <div id="checkpoints">
            <div id="water0-checkpoint"><div>l</div>H<sub>2</sub>O</div>
            <div id="pH-checkpoint"><div>l</div>Acid</div>
            <div id="water1-checkpoint"><div>l</div>H<sub>2</sub>O</div>
            <div id="pesticide-checkpoint"><div>l</div>Pesticide</div>
            <div id="water2-checkpoint"><div>l</div>H<sub>2</sub>O</div>
            <div id="dli-checkpoint"><div>l</div>Light</div>
            <div id="water3-checkpoint"><div>l</div>H<sub>2</sub>O</div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className='row'>
          <div className='column column-5 status-panel'>
          <br></br>
            <div className='row'>
              <div className='column column-12'>
                <div> PLANT HEALTH
                </div>
                <div className='number-display status'>
                {this.state.plantAlive ? this.state.plantHealth.toFixed(2) + ' %' : <span className='dead'>DEAD</span>}
                </div>
              </div>
            </div>
            <div className='row spacing'>
              <div className='column column-6'>
                <div> PLANT HEIGHT
                </div>
                <div className='number-display status'>
                {this.state.plantHeight}<span className='mm-unit'> mm</span>
                </div>
              </div>
              <div className='column column-6'>
                <div> PEST STATUS
                </div>
                <div className='pest-display status'>
                {this.state.progress >= 100 && this.props.gameData.gamePesticideCheckPointAdds === 3 ? <div>Pest Free</div> : <div> At Risk</div>}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='column column-12'>
                <div>
                 <img src={this.plantimage()}/>
                </div>
              </div>
            </div>
          </div>
          <div className='column column-7 controlPanel'>
          <br></br>
            <div id="buttons">
                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    Stage: <div className='stage'> {this.props.gameData.stage} </div>
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.grow}>Start!</button>
                  </div>
                </div>
                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    EC Level: {this.eclevel()}
                              <div className='target-display'> Target: 2.5 EC </div>
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.watercheck}>Add Water</button>
                  </div>
                </div>
                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    pH Level: {this.phlevel()}
                              <div className='target-display'> Target: 5.5 pH </div>
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.pHcheck}>Add Acid</button>
                  </div>
                </div>
                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    Pesticide Level: {this.pesticidelevel()}
                                      <div className='target-display'> Target: 4.0 mg </div>
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.pesticidecheck}>Add Pesticide</button>
                  </div>
                </div>
                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    DLI Level: {this.dlilevel()}
                                <div className='target-display'> Target: 28 mol m<sup>-2</sup> d<sup>-1</sup></div>
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.dlicheck}>Add Light</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='instructions'>
            Instructions:
            Using the buttons above, add the required input when the green progress bar goes over each checkpoint. A perfect game will show a plant health of 100%, plant height of 240cm, a pest free status and all input levels highlighted in green. Note that water contains nutrients, which adjust the EC Level.
            <br></br>
            <br></br>
            <button onClick={this.playAgain}>Play Again!</button>
          </div>
        </div>
      </div>
    );
  }
}
