import React from 'react';

const Weapons = ({weapons, meleeBonus, rangedBonus, grappleBonus}) => (
    <div>
        <h3 className="row row--center">Weapons</h3>

        {weapons.map((weapon) => (
            <div className="grid grid--weapons" key={weapon.id}>
                <h4 className=" grid--weapons__name">{weapon.name}</h4>
                <div className="grid--weapons__features">{weapon.weaponType}, {weapon.encumbrance}, {weapon.damageType}</div>

                <h5 className="grid--weapons__track">Rng</h5>
                <h5 className="grid--weapons__track">Atk</h5>
                <h5 className="grid--weapons__track">Dmg</h5>
                <h5>Crit</h5>

                <div className="grid--weapons__track">{weapon.range}</div>
                <div className="grid--weapons__track">+{
                    (weapon.encumbrance === "Ranged" && rangedBonus)
                    || (weapon.encumbrance === "Unarmed" && grappleBonus)
                    || meleeBonus
                }</div>
                <div className="grid--weapons__track">{weapon.damageMed}</div>
                <div>{weapon.critical}</div>
            </div>
        ))}
    </div>
)

export default Weapons