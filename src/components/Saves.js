import React from 'react';

const Saves = (props) => (
    <div className="grid grid--6col">
        <h4 className="grid__left-col">Saves</h4>
        <h4>Base</h4>
        <div></div>
        <h4>Temp Mod</h4>
        <div></div>
        <h4>Total</h4>
        <div className="grid__left-col">Fortitude</div>
        <div>{props.fortitude.base}</div>
        <div>+</div>
        <input
            type="text"
            name="fortitude"
            value={props.fortitude.mod}
            onChange={props.onInputChange}
        />
        <div>=</div>
        <div>{props.fortitude.total}</div>

        <div className="grid__left-col">Reflex</div>
        <div>{props.reflex.base}</div>
        <div>+</div>
        <input
            type="text"
            name="reflex"
            value={props.reflex.mod}
            onChange={props.onInputChange}
        />
        <div>=</div>
        <div>{props.reflex.total}</div>

        <div className="grid__left-col">Will</div>
        <div>{props.will.base}</div>
        <div>+</div>
        <input
            type="text"
            name="will"
            value={props.will.mod}
            onChange={props.onInputChange}
        />
        <div>=</div>
        <div>{props.will.total}</div>
    </div>
)

export default Saves