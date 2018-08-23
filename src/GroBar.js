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
      pestcideCheckPointAdds: 0,
      DLILevel: 0,
      lightCheckPointAdds: 0,
      plantHeight: 0,
      plantHealth: 100,
      plantAlive: true,
      pests: false
    }


    grow = () => {
      this.setState({
        started: true
      })
      setInterval(this.progress, 100);
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
        if (this.state.progress > 55 && this.state.pestcideCheckPointAdds < 1){ // if player failed to add pesticide at the appropriate time
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
        if (this.state.plantHealth < 50){ // if plant health falls below 50% the plant dies
            if(this.state.plantAlive){
              this.setState({
                plantAlive: false
              })
              alert('Your Plant has died :(')
            }
        }
      }

      if (this.state.progress === 100 && this.props.stage === 'Germination'){
        this.props.gamecheck('Propagation')


        this.setState({
          //started: false,
          waterAdds: 0,
          waterCheckPoint1Adds: 0,
          waterCheckPoint2Adds: 0,
          waterCheckPoint3Adds: 0,
          waterCheckPoint4Adds: 0,
          progress: 1,
          ECLevel: 0, //record
          pHLevel: 7, //record
          pHCheckPointAdds:0,
          pesticideLevel: 0, //record
          pestcideCheckPointAdds: 0,
          DLILevel: 0, //record
          lightCheckPointAdds: 0,
        //  plantHeight: 0,
        //  plantHealth: 100,
          plantAlive: true,
          pests: false
        })

      } else if (this.state.progress === 100 && this.props.stage === 'Propagation'){
        this.props.gamecheck('Production')

        this.setState({
        //  started: false,
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
          pestcideCheckPointAdds: 0,
          DLILevel: 0,
          lightCheckPointAdds: 0,
        //  plantHeight: 0,
        //  plantHealth: 100,
          plantAlive: true,
          pests: false
        })
      } else if (this.state.progress === 100 & this.props.stage === 'Production'){
        this.props.gamecheck('Ready For Harvest')
      }


    }

    watercheck = () => {
      if (this.state.started && this.state.progress < 100){ //the game is still on
        if (this.state.ECLevel < 10 && this.state.plantHealth > 1){ // to ensure ec level never exceeds 10, plant height never exceeds 100 and plant health is never less than 1
          if ((this.state.progress >= 0 &&  this.state.progress <= 10) || (this.state.progress >= 30 &&  this.state.progress <= 40) || (this.state.progress >= 60 &&  this.state.progress <= 70) || (this.state.progress >= 90 &&  this.state.progress <= 100)) { // if the player adds water at the appropriate checkpoints
            if (this.state.progress >= 0 && this.state.progress <= 10){ // if player correctly adds water at the first water checkpoint
              if (this.state.waterCheckPoint1Adds === 0){ // if this was the players first add
                this.setState({
                  waterCheckPoint1Adds: this.state.waterCheckPoint1Adds + 1,
                  waterAdds: this.state.waterAdds + 1,
                  ECLevel: this.state.ECLevel + 0.625,
                  plantHeight: this.state.plantHeight + 10
                })
              } else { // if the player exceeded the required number of water adds (which is one) within this checkpoint
                this.setState({
                  waterCheckPoint1Adds: this.state.waterCheckPoint1Adds + 1,
                  waterAdds: this.state.waterAdds + 1,
                  ECLevel: this.state.ECLevel + 0.625,
                  plantHealth: this.state.plantHealth - 1
                })
              }

            } else if (this.state.progress >= 30 &&  this.state.progress <= 40) {
              if (this.state.waterCheckPoint2Adds === 0){
                this.setState({
                  waterCheckPoint2Adds: this.state.waterCheckPoint2Adds + 1,
                  waterAdds: this.state.waterAdds + 1,
                  ECLevel: this.state.ECLevel + 0.625,
                  plantHeight: this.state.plantHeight + 10
                })
              } else {
                this.setState({
                  waterCheckPoint2Adds: this.state.waterCheckPoint2Adds + 1,
                  waterAdds: this.state.waterAdds + 1,
                  ECLevel: this.state.ECLevel + 0.625,
                  plantHealth: this.state.plantHealth - 1
                })
              }

            } else if (this.state.progress >= 60 &&  this.state.progress <= 70) {
              if (this.state.waterCheckPoint3Adds === 0){
                this.setState({
                  waterCheckPoint3Adds: this.state.waterCheckPoint3Adds + 1,
                  waterAdds: this.state.waterAdds + 1,
                  ECLevel: this.state.ECLevel + 0.625,
                  plantHeight: this.state.plantHeight + 10
                })
              } else {
                this.setState({
                  waterCheckPoint3Adds: this.state.waterCheckPoint3Adds + 1,
                  waterAdds: this.state.waterAdds + 1,
                  ECLevel: this.state.ECLevel + 0.625,
                  plantHealth: this.state.plantHealth - 1
                })
              }

            } else if (this.state.progress >= 90 &&  this.state.progress <= 100) {
              if (this.state.waterCheckPoint4Adds === 0){
                this.setState({
                  waterCheckPoint4Adds: this.state.waterCheckPoint4Adds + 1,
                  waterAdds: this.state.waterAdds + 1,
                  ECLevel: this.state.ECLevel + 0.625,
                  plantHeight: this.state.plantHeight + 10
                })
              } else {
                this.setState({
                  waterCheckPoint4Adds: this.state.waterCheckPoint4Adds + 1,
                  waterAdds: this.state.waterAdds + 1,
                  ECLevel: this.state.ECLevel + 0.625,
                  plantHealth: this.state.plantHealth - 1
                })
              }
            }
          } else { // if the player did not add water at the appropriate checkpoints
            this.setState({
              waterAdds: this.state.waterAdds + 1,
              ECLevel: this.state.ECLevel + 0.625,
              plantHeight: this.state.plantHeight + 5,
              plantHealth: this.state.plantHealth - 0.5
            })
            alert('water added at wrong time')
          }
        }
      }
    }

    pHcheck = () => {
      if (this.state.started && this.state.progress < 100){
        if (this.state.pHLevel === 7){ // if first addition of acid

            if (this.state.progress >= 15 &&  this.state.progress <= 25){ // if acid is added at the appropriate interval/checkpoint
              this.setState({
                pHLevel: this.state.pHLevel - 1.5,
                pHCheckPointAdds: this.state.pHCheckPointAdds + 1
              })
            } else if (this.state.progress < 15 && this.state.pHLevel > 1){
              this.setState({
                pHLevel: this.state.pHLevel - 1.5,
                plantHealth: this.state.plantHealth - 0.1
              })
             alert('acid added too early')
            }
            else if (this.state.progress > 25 && this.state.pHLevel > 1){
              this.setState({
                pHLevel: this.state.pHLevel - 1.5,
                plantHealth: this.state.plantHealth + 1
              })
            alert('acid added too late')
            }

        } else {
          if (this.state.pHLevel > 1  && this.state.plantHealth > 0 && this.state.plantHealth < 100){ // to ensure pH never goes below 1
            this.setState({
              pHLevel: this.state.pHLevel - 1.5,
              plantHealth: this.state.plantHealth - 1
            })
          }
        }
      }
    }



    pesticidecheck = () => {
      if (this.state.started && this.state.progress < 100){
        if (this.state.pesticideLevel === 0){ // if first addition of pesticide
          if (this.state.progress >= 45 &&  this.state.progress <= 55){
            this.setState({
              pesticideLevel: this.state.pesticideLevel + 4,
              pestcideCheckPointAdds: this.state.pestcideCheckPointAdds + 1
            })
          } else if (this.state.progress < 45){
            this.setState({
              pesticideLevel: this.state.pesticideLevel + 4,
              plantHealth: this.state.plantHealth - 0.5
            })
            alert('pesticide added too early')
          } else if (this.state.progress > 55){
            this.setState({
              pesticideLevel: this.state.pesticideLevel + 4,
              pests: false,
              plantHealth: this.state.plantHealth + 2
            })
            alert('pesticide added too late')
          }
        } else { // this else clause will activate if number of pestcide additions exceeds what is required (which is one)
          if (this.state.pesticideLevel < 12 && this.state.plantHealth > 0 && this.state.plantHealth < 100){ //to ensure pesticide never exceeds 12
            this.setState({
              pesticideLevel: this.state.pesticideLevel + 4,
              plantHealth: this.state.plantHealth - 0.5
            })
            alert('too much pesticide added')
          }
        }
      }
    }



    dlicheck = () => {
      if (this.state.started && this.state.progress < 100){
        if (this.state.DLILevel === 0){ // if first addition of light
          if (this.state.progress >= 75 &&  this.state.progress <= 85){
            this.setState({
              DLILevel: this.state.DLILevel + 28,
              lightCheckPointAdds: this.state.lightCheckPointAdds + 1,
              plantHeight: this.state.plantHeight + 40
            })
          } else if (this.state.progress < 75){
            this.setState({
              DLILevel: this.state.DLILevel + 28,
              plantHeight: this.state.plantHeight + 10
            })
            alert('light added too early')
          } else if (this.state.progress > 85){
            this.setState({
              DLILevel: this.state.DLILevel + 28,
              plantHeight: this.state.plantHeight + 10
            })
            alert('light added too late')
          }
        } else { // this else clause will activate if number of additions of light exceeds what is required (which is one)
          if (this.state.DLILevel < 40  && this.state.plantHeight < 100){ // to ensure daily light integral (dli) never exceeds 40 and plant height never exceeds 100
            this.setState({
              DLILevel: this.state.DLILevel + 2,
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

    // {this.state.started ?
    //         <div className='unit-display optimal'> Yes </div>
    //         :
    //         <div className='unit-display'> No </div>
    //         }


  render() {

    return (
      <div>
      <div className='game-header'>
        GRO-GAME
      </div>
        <div id="myProgress">
          <div id="myBar"></div>
          <div id="checkpoints">
            <div id="water0-checkpoint" ref='UniqueElementIdentifier'><div>l</div>H<sub>2</sub>O</div>
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
                {this.state.plantAlive ?
                this.state.plantHealth.toFixed(2) + ' %'
                :
                <span className='dead'>DEAD</span>}
                </div>
              </div>
            </div>
            <div className='row spacing'>
              <div className='column column-6'>
                <div> PLANT HEIGHT
                </div>
                <div className='number-display status'>
                {this.state.plantHeight + ' cm'}
                </div>
              </div>
              <div className='column column-6'>
                <div> PEST STATUS
                </div>
                <div className='pest-display status'>
                {this.state.progress >= 100 && this.state.pestcideCheckPointAdds === 1 && !this.state.pests ? <div>Pest Free</div> : <div> At Risk</div>}
                </div>
              </div>
            </div>
          </div>
          <div className='column column-7 controlPanel'>
          <br></br>
            <div id="buttons">
                <div className='row'>
                <p> {this.props.stage} </p>
                  <div className='column column-8 controlPanel'>
                    Seeded: {this.seeded()}
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.grow}>Start!</button>
                  </div>
                </div>
                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    EC Level: {this.state.progress >= 100 && this.state.waterAdds === 4 && this.state.waterCheckPoint1Adds === 1 && this.state.waterCheckPoint2Adds === 1 && this.state.waterCheckPoint3Adds === 1 && this.state.waterCheckPoint4Adds === 1 && this.state.ECLevel === 2.5 ?
                              <div className='optimal'><span className='number-display'>{this.state.ECLevel.toFixed(3)}</span><span className='unit-display'> EC </span></div>
                              :
                              <div> <span className='number-display'>{this.state.ECLevel.toFixed(3)}</span><span className='unit-display'> EC </span></div>
                              }
                              <div className='target-display'> Target: 2.5 EC </div>
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.watercheck}>Add Water</button>
                  </div>
                </div>
                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    pH Level: {this.state.progress >= 100 && this.state.pHCheckPointAdds === 1 && this.state.pHLevel === 5.5 ?
                              <div className='optimal'><span className='number-display '>{this.state.pHLevel.toFixed(1)}</span><span className='unit-display'> pH</span></div>
                              :
                              <div><span className='number-display'>{this.state.pHLevel.toFixed(1)}</span><span className='unit-display'> pH</span></div>
                              }
                              <div className='target-display'> Target: 5.5 pH </div>
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.pHcheck}>Add Acid</button>
                  </div>
                </div>

                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    Pesticide Level: {this.state.progress >= 100 && this.state.pestcideCheckPointAdds === 1 && this.state.pesticideLevel === 4 ?
                                      <div className='optimal'><span className='number-display'>{this.state.pesticideLevel.toFixed(1)}</span><span className='unit-display'> mg </span></div>
                                      :
                                      <div><span className='number-display'>{this.state.pesticideLevel.toFixed(1)}</span><span className='unit-display'> mg </span></div>
                                      }
                                      <div className='target-display'> Target: 4.0 mg </div>
                  </div>
                  <div className='column column-4'>
                    <button onClick={this.pesticidecheck}>Add Pesticide</button>
                  </div>
                </div>

                <div className='row'>
                  <div className='column column-8 controlPanel'>
                    DLI Level: {this.state.progress >= 100 && this.state.lightCheckPointAdds === 1 && this.state.DLILevel === 28 ?
                                <div className='optimal'><span className='number-display'>{this.state.DLILevel.toFixed(1)}</span><span className='unit-display'> mol m<sup>-2</sup> d<sup>-1</sup> </span></div>
                                :
                                <div><span className='number-display'>{this.state.DLILevel.toFixed(1)}</span><span className='unit-display'> mol m<sup>-2</sup> d<sup>-1</sup> </span></div>
                                }
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
            Using the buttons above, add the required input when the green progress bar goes over each checkpoint. A perfect game will show a plant health of 100%, plant height of 80cm, a pest free status and all input levels highlighted in green. Note that water contains nutrients, which adjust the EC Level.
            <br></br>
            <br></br>
            <button onClick={this.playAgain}>Play Again!</button>
          </div>
        </div>
      </div>
    );
  }
}
