import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'

import { calcBaseMeleeBonus, calcBaseRangedBonus, calcBaseGrappleBonus, convertInputValue } from '../../utils/utils'
import './AttackBonuses.scss'


const AttackBonuses = props => {  
    const { abilities, baseAttackBonuses, size, handleUpdate } = props
    const attackBonusBases = {
        melee: _.map(baseAttackBonuses, (bab) => calcBaseMeleeBonus(bab, abilities.str.score, size)),
        ranged: _.map(baseAttackBonuses, (bab) => calcBaseRangedBonus(bab, abilities.dex.score, size)),
        grapple: _.map(baseAttackBonuses, (bab) => calcBaseGrappleBonus(bab, abilities.str.score, size))
    }
    const [attackBonusMods, setAttackBonusMods] = useState(props.attackBonusMods || { melee: 0, ranged: 0, grapple: 0 }) 
    const [attackBonusTotals, setAttackBonusTotals] = useState(
        _.mapValues(attackBonusMods, (mod, key) => _.map(attackBonusBases[key], (val) => mod + val ))
    ) 
    
    useEffect(() => {
        setAttackBonusTotals(_.mapValues(attackBonusMods, (mod, key) => _.map(attackBonusBases[key], (val) => mod + val)))
        handleUpdate({ attackBonusMods })
    }, [attackBonusMods])

    return (    
        <div className="AttackBonuses">
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
                        value={convertInputValue(attackBonusMods[key])}
                        onChange={(e) => {
                            setAttackBonusMods(update(attackBonusMods, {
                                [key]: { $set: Number(e.target.value) }
                            }))
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