import React from 'react';

import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import Footer from './Footer';
import SpellModal from './SpellModal';
import { startEditProfile } from '../actions/profile';


export class SpellbookPage extends React.Component {
    state = {
        spellbook: this.props.spellbook,
        selected: undefined
    }

    componentWillUnmount() {
        this.props.startEditProfile(this.props.id, {spellbook: this.state.spellbook});
    }

    handleOpenModal = (e) => {
        const spellId = e.target.id;
        const selected = this.props.spells.find((spell) => spell.id === spellId);
        this.setState({selected});
    }

    handleCloseModal = () => {
        this.setState({selected: undefined});
    }

    handleChange = (e) => {
        const level = e.target.getAttribute("level");
        const index = e.target.getAttribute("index");
        const attribute = e.target.getAttribute("attribute");
        const valueChange = Number(e.target.getAttribute("change"));
        this.setState((prevState) => {
            const spell = prevState.spellbook[level].spells[index];
            const value = prevState.spellbook[level].spells[index][attribute] + valueChange;
            const remaining = attribute === "prepared" ? value - spell.used : spell.prepared - value;

            return {
                spellbook: update(prevState.spellbook, {
                    [level]: {
                        spells: {
                            [index]: {
                                [attribute]: { $set: value },
                                remaining: { $set: remaining }
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
                            total: { $set: total }
                        }
                    })
                }
            })
        })
    }

    render() {
        return (
            <div className="layout">
                <Header pageTitle="Spellbook" />
                <SpellModal 
                    selected={this.state.selected}
                    handleCloseModal={this.handleCloseModal}
                />
                <div className="layout__body">

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
                                    <button 
                                        id={spell.id}
                                        className="grid__col1 button--link" 
                                        key={i} 
                                        onClick={this.handleOpenModal}                                   >
                                        {spell.name}
                                    </button>
                                ))}
                                {page.spells.map((spell, i) => (
                                    <div className="grid--spells__school" key={i}>{spell.school.substr(0,4)}</div>
                                ))}
                                {page.spells.map((spell, i) => (
                                    <div className="grid__col3 grid--spells__attribute" key={i}>
                                        <button
                                            change={1}
                                            index={i}
                                            attribute="prepared"
                                            level={level}
                                            onClick={this.handleChange}
                                        >+</button>
                                        <div>{spell.prepared}</div>
                                        <button
                                            change={-1}
                                            index={i}
                                            attribute="prepared"
                                            level={level}
                                            onClick={this.handleChange}
                                        >-</button>
                                    </div>
                                ))}
                                {page.spells.map((spell, i) => (
                                    <div className="grid__col4 grid--spells__attribute" key={i}>
                                        <button
                                            change={1}
                                            index={i}
                                            attribute="used"
                                            level={level}
                                            onClick={this.handleChange}
                                        >+</button>
                                        <div>{spell.used}</div>
                                        <button
                                            change={-1}
                                            index={i}
                                            attribute="used"
                                            level={level}
                                            onClick={this.handleChange}
                                        >-</button>
                                    </div>
                                ))}
                               
                                {page.spells.map((spell, i) => (
                                    <div className="grid__col5" key={i}>{spell.remaining}</div>
                                ))}

                            </div>
                        </div>
                    ))}

                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
    spellbook: state.profile.spellbook,
    spells: state.spells
})

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(SpellbookPage)