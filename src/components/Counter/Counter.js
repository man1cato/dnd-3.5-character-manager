import React from 'react'
import './Counter.scss'


const Counter = ({ value, updateValue, noInput, className }) => {
   return (
      <div className={`Counter ${className}`}>
         <button
            type="button"
            onClick={() => updateValue(value - 1)}
         >
            <ion-icon name="remove" size="small" />
         </button>

         {noInput ? (
            <div className="counter-value">{value}</div>
         ) : (
            <input
               className="counter-value"
               size={3}
               value={value}
               onChange={e => updateValue(isNaN(e.target.value) ? value : e.target.value)}
            />
         )}
         
         <button
            type="button"
            onClick={() => updateValue(value + 1)}
         >
            <ion-icon name="add" size="small" />
         </button>
      </div>
   )
}

export default Counter