import React from 'react';

import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';

export class SpellbookPage extends React.Component {
    constructor(props) {
        super(props);

        const totalSpells = () => total = spellbook[i].spells.map((spell) => spell.prepared).reduce((total, num) => total + num);

        let spellbook = this.props.spellbook;
        console.log(spellbook)

        for (let i = 0; i < spellbook.length; i++) {
            spellbook[i].total = spellbook[i].spells.map((spell) => spell.prepared).reduce((total, num) => total + num);
        }
        this.state = {
            spellbook
        }
    }

    onInputChange = (e) => {
        const spellIndex = e.target.id;
        const attribute = e.target.name;
        const value = e.target.value;
        this.setState((prevState) => {
            const spell = prevState.spellbook[0].spells[spellIndex];
            const remaining = attribute === "prepared" ? value - spell.used : spell.prepared - value; 
            const total = prevState.spellbook[0].spells.map((spell) => spell.prepared).reduce((total, num) => total + num);
            console.log("spell",spell)
            console.log("remaining", remaining)
            console.log("total", total)
            return {
                spellbook: update(prevState.spellbook, {
                    0: {
                        spells:{
                            spellIndex: {
                                [attribute]: { $set: value },
                                remaining: {$set: remaining}
                            }
                        },
                        total
                    }
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Header pageTitle="Spellbook" />
                <div className="container container--body">

                    {this.state.spellbook.map((page, level) => (
                        <div key={level}>
                            <h3 className="row row--center">Level {level} Spells ({page.total}/{page.spellsPerDay})</h3>

                            <div className="grid grid--spells">
                                <h5 className="grid__col1">Spell</h5>
                                <h5 className="grid--spells__school">School</h5>
                                <h5>Prep</h5>
                                <h5>Used</h5>
                                <h5>Rmng</h5>

                                {page.spells.map((spell, i) => (
                                    <div className="grid__col1" key={i}>{spell.name}</div>
                                ))}
                                {page.spells.map((spell, i) => (
                                    <div className="grid--spells__school" key={i}>{spell.school.substr(0,4)}</div>
                                ))}
                                {page.spells.map((spell, i) => (
                                    <input
                                        className="grid__col3"
                                        key={i}
                                        id={i}
                                        name="prepared"
                                        value={spell.prepared}
                                        onChange={this.onInputChange}
                                    />
                                ))}
                                {page.spells.map((spell, i) => (
                                    <input
                                        className="grid__col4"
                                        key={i}
                                        id={i}
                                        name="used"
                                        value={spell.used}
                                        onChange={this.onInputChange}
                                    />
                                ))}
                                {page.spells.map((spell, i) => (
                                    <div className="grid__col5" key={i}>{spell.remaining}</div>
                                ))}

                            </div>
                        </div>
                    ))}

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


export default connect(mapStateToProps, mapDispatchToProps)(SpellbookPage)