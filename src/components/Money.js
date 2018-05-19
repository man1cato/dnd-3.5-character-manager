import React from 'react';

const Money = ({money, onInputChange}) => (
    <div>
        <h3 className="row__money">Money</h3>
        <div className="row__money">
            <input
                type="text"
                name="money"
                id="pp"
                value={money.pp}
                onChange={onInputChange}
            />  
            <span>pp</span>
        </div>
        <div className="row__money">
            <input
                type="text"
                name="money"
                id="gp"
                value={money.gp}
                onChange={onInputChange}
            />  
            <span>gp</span>
        </div>
        <div className="row__money">
            <input
                type="text"
                name="money"
                id="sp"
                value={money.sp}
                onChange={onInputChange}
            />  
            <span>sp</span>
        </div>
        <div className="row__money">
            <input
                type="text"
                name="money"
                id="cp"
                value={money.cp}
                onChange={onInputChange}
            />  
            <span>cp</span>            
        </div>
        <div className="row__money">
            <h4>Total:</h4> <span>{money.total} gp</span> 
        </div>
    </div>    
)

export default Money