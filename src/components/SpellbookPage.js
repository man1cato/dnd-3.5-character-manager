import React from 'react';

import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import { startEditProfile } from '../actions/profile';


export class SpellbookPage extends React.Component {
    constructor(props) {
        super(props);

        let spellbook = this.props.spellbook;

        for (let i = 0; i < spellbook.length; i++) {
            spellbook[i].total = spellbook[i].spells.map((spell) => spell.prepared).reduce((total, num) => total + num);
        }
        this.state = {
            spellbook
        }
    }

    componentWillUnmount() {
        this.props.startEditProfile(this.props.id, this.state);
    }

    onInputChange = (e) => {
        const level = e.target.getAttribute("level");
        const index = e.target.getAttribute("index");
        const attribute = e.target.getAttribute("attribute");
        let value = Number(e.target.value);
        value = isNaN(value) ? 0 : value;
        this.setState((prevState) => {
            const spell = prevState.spellbook[level].spells[index];
            const remaining = attribute === "prepared" ? value - spell.used : spell.prepared - value; 
            return {
                spellbook: update(prevState.spellbook, {
                    [level]: {
                        spells:{
                            [index]: {
                                [attribute]: {$set: value},
                                remaining: {$set: remaining}
                            }
                        }
                    }
                })
            }
        }, () => {
            this.setState((prevState) => {
                const total = prevState.spellbook[level].spells.map((spell) => spell.prepared).reduce((total, num) => total + num);
                return {
                    spellbook: update(prevState.spellbook, {
                        [level]: {
                            total: {$set: total}
                        }
                    })
                }
            })
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
                                        index={i}
                                        attribute="prepared"
                                        level={level}
                                        value={spell.prepared}
                                        onChange={this.onInputChange}
                                    />
                                ))}
                                {page.spells.map((spell, i) => (
                                    <input
                                        className="grid__col4"
                                        key={i}
                                        index={i}
                                        attribute="used"
                                        level={level}
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