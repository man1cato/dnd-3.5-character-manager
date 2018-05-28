import React from 'react';

import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';

export class SpellsPage extends React.Component {
    constructor(props) {
        super(props);
        const spellbook = this.props.spellbook;
        this.state = {
            level0: spellbook[0],
            level1: spellbook[1],
            level2: spellbook[2],
            level3: spellbook[3],
            level4: spellbook[4],
            level5: spellbook[5],
            level6: spellbook[6],
            level7: spellbook[7],
            level8: spellbook[8],
            level9: spellbook[9]
        }
    }

    onInputChange = (e) => {
        const id = e.target.id;
        const name = e.target.name;
        const value = e.target.value;
        const level = e.target.level;
        this.setState((prevState) => {
            return {
                [`level${level}`]: update(prevState[`level${level}`], {
                    spells:{
                        [name]: { $set: value }
                    }
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Header pageTitle="Spells" />
                <div className="container container--body">

                    <h3 className="row row--center">Level 0 Spells (total/{this.state.level0.spellsPerDay})</h3>

                    <div className="grid grid--items">
                        <h5 className="grid__col1">Spell</h5>
                        <h5>Prep</h5>
                        <h5>Used</h5>
                        <h5>Rmng</h5>

                        {this.state.level0.spells.map((spell) => (
                            <div className="grid__col1" key={spell.id}>{spell.name}</div>
                        ))}
                        {this.state.level0.spells.map((spell) => (
                            <input
                                className="grid__col2"
                                key={spell.id}
                                id={spell.id}
                                name="prepared"
                                level={spell.level}
                                value={spell.prepared}
                                onChange={this.onInputChange}
                            />
                        ))}
                        {this.state.level0.spells.map((spell) => (
                            <input
                                className="grid__col2"
                                key={spell.id}
                                id={spell.id}
                                name="used"
                                level={spell.level}
                                value={spell.used}
                                onChange={this.onInputChange}
                            />
                        ))}
                        {this.state.level0.spells.map((spell) => (
                            <input
                                className="grid__col2"
                                key={spell.id}
                                id={spell.id}
                                name="remaining"
                                level={spell.level}
                                value={spell.remaining}
                                onChange={this.onInputChange}
                            />
                        ))}

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
    spellbook: state.profile.spellbook
})

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(SpellsPage)