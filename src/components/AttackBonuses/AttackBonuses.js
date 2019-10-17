import React, { Fragment } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'

import { convertInputValue } from '../../utils/utils'
import './AttackBonuses.scss'


const AttackBonuses = ({ attackBonuses, handleUpdate }) => {  
    return (    
        <div className="AttackBonuses">
            <h5 className="grid__col1">Type</h5>
            <h5>Base</h5>
            <div></div>
            <h5>Mod</h5>
            <div></div>
            <h5>Total</h5>

            {_.map(['melee', 'ranged', 'grapple'], type => {
                const { base, mod } = attackBonuses[type]
                return (
                    <Fragment key={type}>
                        <div className="grid__col1">{_.startCase(type)}</div>
                        <div>{base.join(' / ')}</div>
                        <div>+</div>
                        <input
                            type="number"
                            data-testid={type + 'Mod'}
                            value={convertInputValue(mod)}
                            onChange={e => {
                                const newMod = Number(e.target.value)
                                handleUpdate({
                                    attackBonuses: update(attackBonuses, {
                                        [type]: {
                                            mod: { $set: newMod },
                                            total: { $set: _.map(base, val => val + newMod) }
                                        }
                                    })
                                })
                            }}
                        />
                        <div>=</div>
                        <div>{_.map(base, val => val + mod).join(' / ')}</div>
                    </Fragment>
                )
            })}

        </div>
    )
}


export default AttackBonuses