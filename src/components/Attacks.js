import React from 'react';

const Attacks = ({attacks, onInputChange}) => (        
    <div className=" grid grid--6col">
        <h5 className="grid__col1">Attack</h5>
        <h5>Base</h5>
        <div></div>
        <h5>Mod</h5>
        <div></div>
        <h5>Total</h5>

        <div className="grid__col1">Melee</div>
        <div>{attacks.melee.base}</div>
        <div>+</div>
        <input
            type="text"
            name="attacks"
            id="melee"
            value={attacks.melee.mod}
            onChange={onInputChange}
        />
        <div>=</div>
        <div>{attacks.melee.total}</div>

        <div className="grid__col1">Ranged</div>
        <div>{attacks.ranged.base}</div>
        <div>+</div>
        <input
            type="text"
            name="attacks"
            id="ranged"
            value={attacks.ranged.mod}
            onChange={onInputChange}
        />
        <div>=</div>
        <div>{attacks.ranged.total}</div>

        <div className="grid__col1">Grapple</div>
        <div>{attacks.grapple.base}</div>
        <div>+</div>
        <input
            type="text"
            name="attacks"
            id="grapple"
            value={attacks.grapple.mod}
            onChange={onInputChange}
        />
        <div>=</div>
        <div>{attacks.grapple.total}</div>
    </div>
)

export default Attacks