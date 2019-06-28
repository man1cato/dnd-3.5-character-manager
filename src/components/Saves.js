import React, { Fragment, useState, useEffect } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'

import { convertInputValue } from '../utils/utils'


const Saves = ({ profileSaveMods, saveBases, handleUpdate }) => {
    const [saveMods, setSaveMods] = useState(_.mapValues(profileSaveMods, (val) => val || ''))
    const [saveTotals, setSaveTotals] = useState(_.mapValues(saveMods, (val, key) => saveBases[key] + Number(val)))

    useEffect(() => {
        setSaveTotals(_.mapValues(saveBases, (val, key) => val + saveMods[key]))
        handleUpdate({ saveMods })  
    }, [saveMods])

    return (
        <div className="grid--6col">
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
                        id={key}
                        value={val}
                        onChange={(e) => {
                            setSaveMods(update(saveMods, {
                                [key]: { $set: convertInputValue(e.target.value) }
                            }))
                        }}
                    />
                    <div>=</div>
                    <div>{saveTotals[key]}</div>
                </Fragment>
            ))}
        </div>
    )
}

export default Saves