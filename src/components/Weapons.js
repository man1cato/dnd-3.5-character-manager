import React from 'react';

const Weapons = () => (
    <div>
        <div className="row row--center">
            <h3>Weapons</h3>
        </div>
        <div className="grid grid--weapons">
            <h4 className=" grid--weapons__name">Longsword</h4>
            <div className="grid--weapons__features">Medium / Melee / Slashing</div>

            <h5>Rng</h5>
            <h5>Atk</h5>
            <h5>Dmg</h5>
            <h5>Crit</h5>

            <div>-</div>
            <div>+4</div>
            <div>1d8+2</div>
            <div>19-20/x2</div>

        </div>
    </div>
)

export default Weapons