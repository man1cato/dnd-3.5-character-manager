import React from 'react';

const Items = ({items, itemsTotalValue, itemsTotalWeight, onInputChange}) => (
    <div>
        <h3 className="row row--center">Items</h3>
        <div className="grid grid--items">
            <h5 className="grid__col1">Item</h5>
            <h5>Qty</h5>
            <h5>Value</h5>
            <h5>Weight</h5>  

            {items.map((item, i) => (
                <div className="grid__col1" key={i}>{item.name}</div>                                
            ))}
            {items.map((item, i) => (
                <input 
                    className="grid__col2" 
                    key={i}
                    id={i}
                    name="items"
                    value={item.qty}
                    onChange={onInputChange}
                />                                
            ))}
            {items.map((item, i) => (
                <div className="grid__col3" key={i}>{item.totalValue} gp</div>                                
            ))}
            {items.map((item, i) => (
                <div className="grid__col4" key={i}>{item.totalWeight} lbs</div>                                
            ))}

            <div className="grid__col1 grid--items__totals">Totals</div>
            <div className="grid__col3 grid--items__totals">{itemsTotalValue} gp</div>
            <div className="grid__col4 grid--items__totals">{itemsTotalWeight} lbs</div>

        </div>
    </div>
)

export default Items