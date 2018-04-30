import React from 'react';

const Saves = (props) => (
    <div className="grid grid--saves">
        <div className="grid__left-col">Saves</div>
        <div>Base</div>
        <div></div>
        <div>Temp Mod</div>
        <div></div>
        <div>Total</div>
        <div className="grid__left-col">Fortitude</div>
        <div>{props.fort}</div>
        <div>+</div>
        <input
            className=""
            type="text"
            id="fort"
            value={props.fortMod}
            onChange={props.onInputChange}
        />
        <div>=</div>
        <div>totalFort</div>

        <div className="grid__left-col">Reflex</div>
        <div>{props.ref}</div>
        <div>+</div>
        <input
            className=""
            type="text"
            id="ref"
            value={props.refMod}
            onChange={props.onInputChange}
        />
        <div>=</div>
        <div>totalRef</div>

        <div className="grid__left-col">Will</div>
        <div>{props.will}</div>
        <div>+</div>
        <input
            className=""
            type="text"
            id="will"
            value={props.willMod}
            onChange={props.onInputChange}
        />
        <div>=</div>
        <div>totalWill</div>
    </div>
)

export default Saves