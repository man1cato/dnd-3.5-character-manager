import React from 'react';
import { connect } from 'react-redux';

const Weapons = (props) => (
    <div>
        <h3 className="row row--center">Weapons</h3>

        {props.weaponSet.map((weaponId) => {
            const weapon = props.weapons.find((weapon) => weapon.id === weaponId);

            return (
                <div className="grid grid--weapons" key={weaponId}>
                    <h4 className=" grid--weapons__name">{weapon.name}</h4>
                    <div className="grid--weapons__features">{weapon.weaponType}, {weapon.encumbrance}, {weapon.damageType}</div>

                    <h5 className="grid--weapons__track">Rng</h5>
                    <h5 className="grid--weapons__track">Atk</h5>
                    <h5 className="grid--weapons__track">Dmg</h5>
                    <h5>Crit</h5>

                    <div className="grid--weapons__track">{weapon.range}</div>
                    <div className="grid--weapons__track">+{
                        (weapon.encumbrance === "Ranged" && props.rangedBonus)
                        || (weapon.encumbrance === "Unarmed" && props.grappleBonus)
                        || props.meleeBonus
                    }</div>
                    <div className="grid--weapons__track">{weapon.damageM}</div>
                    <div>{weapon.critical}</div>
                </div>
            )
        })}
    </div>
)

const mapStateToProps = (state) => ({
    weapons: state.items.filter((item) => item.category === "Weapon")
});

export default connect(mapStateToProps)(Weapons);