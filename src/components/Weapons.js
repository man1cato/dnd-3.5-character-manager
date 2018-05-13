import React from 'react';

const Weapons = ({weapons, meleeBonus, rangedBonus, grappleBonus}) => (
    <div>
        <div className="row row--center">
            <h3>Weapons</h3>
        </div>

        {weapons.map((weapon) => (
            <div className="grid grid--weapons" key={weapon.id}>
                <h4 className=" grid--weapons__name">{weapon.name}</h4>
                <div className="grid--weapons__features">{weapon.weaponType}, {weapon.attackType}, {weapon.damageType}</div>

                <h5>Rng</h5>
                <h5>Atk</h5>
                <h5>Dmg</h5>
                <h5>Crit</h5>

                <div>{weapon.range}</div>
                <div>{
                    (weapon.attackType === "Ranged" && rangedBonus)
                    || (weapon.attackType === "Unarmed" && grappleBonus)
                    || meleeBonus
                }</div>
                <div>{weapon.damageMed}</div>
                <div>{weapon.critical}</div>
            </div>
        ))}
    </div>
)

export default Weapons