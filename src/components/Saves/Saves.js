import React, { Fragment, useState, useEffect } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'

import { convertInputValue } from '../../utils/utils'
import './Saves.scss'


const Saves = props => {
    const { saveBases, handleUpdate } = props
    const [saveMods, setSaveMods] = useState(props.saveMods || { fortitude: 0, reflex: 0, will: 0 })
    const [saveTotals, setSaveTotals] = useState(_.mapValues(saveMods, (val, key) => saveBases[key] + val))

    useEffect(() => {
        setSaveTotals(_.mapValues(saveBases, (val, key) => val + saveMods[key]))
        handleUpdate({ saveMods })  
    }, [saveMods])

    return (
        <div className="Saves">
            <h5 className="grid__col1">Type</h5>
            <h5>Base</h5>
            <div></div>
            <h5>Mod</h5>
            <div></div>
            <h5>Total</h5>

            {_.map(saveMods, (val, key) => (
                <Fragment key={key}>
                    <div className="grid__col1">{_.startCase(key)}</div>
                    <div>{saveBases[key]}</div>
                    <div>+</div>
                    <input
                        type="number"
                        data-testid={key + 'Mod'}
                        value={convertInputValue(val)}
                        onChange={(e) => {
                            setSaveMods(update(saveMods, {
                                [key]: { $set: Number(e.target.value) }
                            }))
                        }}
                    />
                    <div>=</div>
                    <div data-testid={key + 'Total'}>{saveTotals[key]}</div>
                </Fragment>
            ))}
        </div>
    )
}

export default Saves