import React from 'react';

const Attacks = (props) => (
    <div>
        <div className="row">Base Attack Bonus: {props.bab}</div>
        <div className=" grid grid--6col">
            <h4 className="grid__left-col">Attack Type</h4>
            <h4>Base</h4>
            <div></div>
            <h4>Temp Mod</h4>
            <div></div>
            <h4>Total</h4>

            <div className="grid__left-col">Melee</div>
            <div>{props.melee.base}</div>
            <div>+</div>
            <input
                type="text"
                name="melee"
                value={props.melee.mod}
                onChange={props.onInputChange}
            />
            <div>=</div>
            <div>{props.melee.total}</div>

            <div className="grid__left-col">Ranged</div>
            <div>{props.ranged.base}</div>
            <div>+</div>
            <input
                type="text"
                name="ranged"
                value={props.ranged.mod}
                onChange={props.onInputChange}
            />
            <div>=</div>
            <div>{props.ranged.total}</div>

            <div className="grid__left-col">Grapple</div>
            <div>{props.grapple.base}</div>
            <div>+</div>
            <input
                type="text"
                name="grapple"
                value={props.grapple.mod}
                onChange={props.onInputChange}
            />
            <div>=</div>
            <div>{props.grapple.total}</div>
        </div>
    </div>
)

export default Attacks