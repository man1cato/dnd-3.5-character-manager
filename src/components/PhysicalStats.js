import React from 'react'

const PhysicalStats = ({hp, ac, speed, initiative, handleChange}) => (
    <div className="grid grid--combat">
        <div className="row__title">Hit Points</div>
        <div className="row">
            <div className="row__item">
                <h5>Base</h5>
                <div>{hp.base}</div>
            </div>
            <div className="row__item--bottom">+</div>
            <div className="row__item">
                <h5>Mod</h5>
                <input
                    type="text"
                    name="hp"
                    value={hp.mod}
                    onChange={handleChange}
                />
            </div>
            <div className="row__item--bottom">-</div>
            <div className="row__item">
                <h5>Dmg</h5>
                <input
                    type="text"
                    name="hp"
                    id="damage"
                    value={hp.damage}
                    onChange={handleChange}
                />
            </div>
            <div className="row__item--bottom">=</div>
            <div className="row__item">
                <h5>Curr</h5>
                <div>{hp.total}</div>
            </div>
        </div>

        <div className="row__title">Armor Class</div>
        <div className="row">            
            <div className="row__item">
                <h5>Base</h5>
                <div>{ac.base}</div>
            </div>
            <div className="row__item">
                <h5>Flat</h5>
                <div>{ac.flat}</div>
            </div>
            <div className="row__item">
                <h5>Touch</h5>
                <div>{ac.touch}</div>
            </div>
        </div>

        <div className="row__title">Initiative</div>
        <div className="row">            
            <div className="row__item">
                <h5>Base</h5>
                <div>{initiative.base}</div>
            </div>
            <div className="row__item--bottom">+</div>
            <div className="row__item">
                <h5>Mod</h5>
                <input
                    type="text"
                    name="initiative"
                    value={initiative.mod}
                    onChange={handleChange}
                />
            </div>
            <div className="row__item--bottom">=</div>
            <div className="row__item">
                <h5>Total</h5>
                <div>{initiative.total}</div>
            </div>                
        </div>

        <div className="row__title">Speed</div>
        {speed.ground ? 
            <div className="row--left">   
                <div className="row__item">
                    <h5>Ground</h5>
                    <div>{speed.ground}</div>
                </div>
                <div className="row__item">
                    <h5>Flight</h5>
                    <div>{speed.flight}</div>
                </div>                 
            </div>
        :
            <div className="row--left">{speed} ft/round</div>            
        }       
    </div>
)

export default PhysicalStats;