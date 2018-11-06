import React from 'react';

const PhysicalStats = ({hp, ac, speed, initiative, onInputChange}) => (     
    <div>
        <h3 className="text-center mb-5">Physical Stats</h3>
        <div className="input-group--stats">
            <h4>HP</h4>

            <div>
                <h5>Base</h5>
                <div>{hp.base}</div>
            </div>

            <div>+</div>

            <div>
                <h5>Mod</h5>
                <input
                    type="text"
                    name="hp"
                    value={hp.mod}
                    onChange={onInputChange}
                />
            </div>

            <div>-</div>

            <div>
                <h5>Dmg</h5>
                <input
                    type="text"
                    name="hp"
                    id="damage"
                    value={hp.damage}
                    onChange={onInputChange}
                />
            </div>
            <div>=</div>
            <div>
                <h5>Curr</h5>
                <div>{hp.total}</div>
            </div>
        </div>

        <div className="input-group--stats">
            <h4>AC</h4>

            <div>
                <h5>Base</h5>
                <div>{ac.base}</div>
            </div>

            <div>
                <h5>Flat</h5>
                <div>{ac.flat}</div>
            </div>
            
            <div>
                <h5>Touch</h5>
                <div>{ac.touch}</div>
            </div>
        </div>

        <div className="input-group--stats">
            <h4>Init</h4>
            
            <div>
                <h5>Base</h5>
                <div>{initiative.base}</div>
            </div>
            
            <div>+</div>
            
            <div>
                <h5>Mod</h5>
                <input
                    type="text"
                    name="initiative"
                    value={initiative.mod}
                    onChange={onInputChange}
                />
            </div>
            
            <div>=</div>
            
            <div>
                <h5>Total</h5>
                <div>{initiative.total}</div>
            </div>                
        </div>

         <div className="input-group--stats">
            <h4>Speed</h4>
            {speed.ground ? (
                <React.Fragment>   
                    <div>
                        <h5>Ground</h5>
                        <div>{speed.ground}</div>
                    </div>
                    <div>
                        <h5>Flight</h5>
                        <div>{speed.flight}</div>
                    </div>                 
                </React.Fragment>
            ) : (
                <div>{speed} ft/round</div>            
            )}         
         </div>


        
    </div>

)

export default PhysicalStats;