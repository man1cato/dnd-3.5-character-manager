import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'

import { calcBaseMeleeBonus, calcBaseRangedBonus, calcBaseGrappleBonus, convertInputValue } from '../utils/utils'


const AttackBonuses = ({ profileAttackBonusMods, abilities, baseAttackBonuses, size, handleUpdate }) => {  
    const attackBonusBases = {
        melee: _.map(baseAttackBonuses, (bab) => calcBaseMeleeBonus(bab, abilities.str.score, size)),
        ranged: _.map(baseAttackBonuses, (bab) => calcBaseRangedBonus(bab, abilities.dex.score, size)),
        grapple: _.map(baseAttackBonuses, (bab) => calcBaseGrappleBonus(bab, abilities.str.score, size))
    }
    const [attackBonusMods, setAttackBonusMods] = useState(_.mapValues(profileAttackBonusMods, (val) => val || '')) 
    const [attackBonusTotals, setAttackBonusTotals] = useState(
        _.mapValues(attackBonusMods, (mod, key) => _.map(attackBonusBases[key], (val) => Number(mod) + val ))
    ) 
    
    useEffect(() => {
        setAttackBonusTotals(_.mapValues(attackBonusMods, (mod, key) => _.map(attackBonusBases[key], (val) => Number(mod) + val)))
        handleUpdate({ attackBonusMods })
    }, [attackBonusMods])

    return (    
        <div className="grid--6col">
            <h5 className="grid__col1">Type</h5>
            <h5>Base</h5>
            <div></div>
            <h5>Mod</h5>
            <div></div>
            <h5>Total</h5>

            {_.map(['melee', 'ranged', 'grapple'], (key) => (
                <Fragment key={key}>
                    <div className="grid__col1">{_.startCase(key)}</div>
                    <div>{attackBonusBases[key].join(' / ')}</div>
                    <div>+</div>
                    <input
                        type="number"
                        id={key}
                        value={attackBonusMods[key]}
                        onChange={(e) => {
                            setAttackBonusMods(
                                update(attackBonusMods, {
                                    [key]: { $set: convertInputValue(e.target.value) }
                                })
                            )
                        }}
                    />
                    <div>=</div>
                    <div>{attackBonusTotals[key].join(' / ')}</div>
                </Fragment>
            ))}

        </div>
    )
}


export default AttackBonuses