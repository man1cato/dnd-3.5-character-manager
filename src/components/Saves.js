import React from 'react';

const Saves = ({saves, onInputChange }) => (
    <div className="grid grid--6col">
        <h5 className="grid__col1">Saves</h5>
        <h5>Base</h5>
        <div></div>
        <h5>Mod</h5>
        <div></div>
        <h5>Total</h5>
        <div className="grid__col1">Fortitude</div>
        <div>{saves.fortitude.base}</div>
        <div>+</div>
        <input
            type="text"
            name="saves"
            id="fortitude"
            value={saves.fortitude.mod}
            onChange={onInputChange}
        />
        <div>=</div>
        <div>{saves.fortitude.total}</div>

        <div className="grid__col1">Reflex</div>
        <div>{saves.reflex.base}</div>
        <div>+</div>
        <input
            type="text"
            name="saves"
            id="reflex"
            value={saves.reflex.mod}
            onChange={onInputChange}
        />
        <div>=</div>
        <div>{saves.reflex.total}</div>

        <div className="grid__col1">Will</div>
        <div>{saves.will.base}</div>
        <div>+</div>
        <input
            type="text"
            name="saves"
            id="will"
            value={saves.will.mod}
            onChange={onInputChange}
        />
        <div>=</div>
        <div>{saves.will.total}</div>
    </div>
)

export default Saves