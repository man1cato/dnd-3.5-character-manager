import React, { useState, useEffect } from 'react'
import './CounterInput.scss'


const CounterInput = ({ value, updateValue }) => {
   return (
      <div className="CounterInput">
         <button
            onClick={() => updateValue(value - 1)}
         >
            <ion-icon name="remove" size="small" />
         </button>

         <input
            type="number"
            size={3}
            value={value}
            onChange={e => updateValue(isNaN(e.target.value) ? value : e.target.value)}
         />
         
         <button
            onClick={() => updateValue(value + 1)}
         >
            <ion-icon name="add" size="small" />
         </button>
      </div>
   )
}

export default CounterInput