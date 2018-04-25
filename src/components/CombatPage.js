import React from 'react';

export default class CombatPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="container grid">
          <h4>HP</h4>
          <div>maxHP</div>
          <div>-</div>
          <input
            className=""
            type="text"
            value={this.state.hp}
            onChange={this.onDamage}
          />
          <div>=</div>
          <div>remainingHP</div>

          <div></div>
          <div>Max</div>
          <div></div>
          <div>Dmg</div>
          <div></div>
          <div>Rmng</div>

          <h4>AC</h4>
          <div>baseAC</div>
          <div>flatAC</div>
          <div>touchAC</div>

          <div></div>
          <div>Base</div>
          <div>Flat</div>
          <div>Touch</div>

          <div>Speed 30 ft/round</div>

          <div>Initiative</div>
          <div>dexMod</div>
          <div>+</div>
          <input
            className=""
            type="text"
            value={this.state.initMod}
            onChange={this.onInitMod}
          />
          <div>=</div>
          <div>totalInit</div>


          <div>Saves</div>

          <div>Fortitude</div>
          <div>baseFort</div>
          <div>+</div>
          <input
            className=""
            type="text"
            value={this.state.fortMod}
            onChange={this.onFortMod}
          />
          <div>=</div>
          <div>totalFort</div>

          <div>Reflex</div>
          <div>baseRef</div>
          <div>+</div>
          <input
            className=""
            type="text"
            value={this.state.refMod}
            onChange={this.onRefMod}
          />
          <div>=</div>
          <div>totalRef</div>

          <div>Will</div>
          <div>baseWill</div>
          <div>+</div>
          <input
            className=""
            type="text"
            value={this.state.willMod}
            onChange={this.onWillMod}
          />
          <div>=</div>
          <div>totalWill</div>

      </div>
    )
  }
}
