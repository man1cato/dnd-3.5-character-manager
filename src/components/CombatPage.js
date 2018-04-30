import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Saves from './Saves';

export class CombatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hp: this.props.hp,
      damage: "",
      initMod: "",
      fortMod: "",
      refMod: "",
      willMod: ""
    }
  }
  
  onInputChange = (e) => {
    const inputId = e.target.id;
    const value = Number(e.target.value) === 0 ? "" : Number(e.target.value);
    this.setState((prevState) => ({
      damage: inputId === "damage" ? value : prevState.damage,
      initMod: inputId === "init" ? value : prevState.initMod,      
      fortMod: inputId === "fort" ? value : prevState.fortMod,
      refMod: inputId === "ref" ? value : prevState.refMod,
      willMod: inputId === "will" ? value : prevState.willMod      
    }))
  }

  render () {
    return (
      <div>
        <Header pageTitle="Combat" />
        <div className="container container--body">
            <h4>HP</h4>
            <div>{this.props.hp}</div>
            <div>-</div>
            <input
              type="text"
              id="damage"
              value={this.state.damage}
              onChange={this.onInputChange}
            />
            <div>=</div>
            <div>currentHP</div>

            <div></div>
            <div>Max</div>
            <div></div>
            <div>Dmg</div>
            <div></div>
            <div>Rmng</div>

            <h4>AC</h4>
            <div>{this.props.ac}</div>
            <div>flatAC</div>
            <div>touchAC</div>

            <div></div>
            <div>Base</div>
            <div>Flat</div>
            <div>Touch</div>

            <div>Speed {this.props.speed} ft/round</div>

            <div>Initiative</div>
            <div>{this.props.abilities.dex.mod}</div>
            <div>+</div>
            <input
              type="text"
              id="init"
              value={this.state.initMod}
              onChange={this.onInputChange}
            />
            <div>=</div>
            <div>totalInit</div>

            <Saves 
              fort={this.state.fort}
              ref={this.state.ref}
              will={this.state.will}
              fortMod={this.state.fortMod}
              refMod={this.state.refMod}
              willMod={this.state.willMod}
              onInputChange={this.onInputChange}
            />            

        </div>
      </div>  
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.profile
})

export default connect(mapStateToProps)(CombatPage)