import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import update from 'immutability-helper'

import SpellModal from './SpellModal'


const listPreparedSpells = (spellbook) => {
   let preparedSpells = []
   spellbook.forEach((page) => {
      const filteredSpells = page.spells.filter((spell) => spell.prepared > 0)
      filteredSpells.forEach((spell) => preparedSpells.push(spell))         
   })
   return preparedSpells
}

export class PreparedSpells extends React.Component{
   state = {
      preparedSpells: listPreparedSpells(this.props.spellbook),
      spellbook: this.props.spellbook,
      castSpells: [],
      selected: undefined
   }     

   handleOpenModal = (e) => {
      const id = e.target.id;
      const selected = this.props.spells[id]
      this.setState({selected})
   }

   handleCloseModal = () => {
      this.setState({selected: undefined})
   }

   handleChange = (e) => {
      const level = e.target.getAttribute("level")
      const spellId = e.target.getAttribute("spellid")
      const index = this.props.spellbook[level].spells.findIndex((spell) => spell.id === spellId)
      const attribute = e.target.getAttribute("attribute")
      const valueChange = Number(e.target.getAttribute("change"))
      
      this.setState((prevState) => {
         const spell = prevState.spellbook[level].spells[index]
         const value = prevState.spellbook[level].spells[index][attribute] + valueChange
         const remaining = attribute === "prepared" ? value - spell.used : spell.prepared - value
         let castSpells = prevState.castSpells
         if (valueChange > 0) {
            castSpells.push(spellId)
         } else {
            castSpells = castSpells.filter((id) => id !== spellId)
         }

         return {
            spellbook: update(prevState.spellbook, {
               [level]: {
                  spells: {
                     [index]: {
                        [attribute]: { $set: value },
                        remaining: { $set: remaining }
                     }
                  }
               }
            }),
            castSpells
         }
      }, () => {
         this.setState((prevState) => {
            const total = prevState.spellbook[level].spells.map((spell) => spell.prepared).reduce((total, num) => total + num)
            const preparedSpells = listPreparedSpells(prevState.spellbook)
            return {
               spellbook: update(prevState.spellbook, {
                  [level]: {
                     total: { $set: total }
                  }
               }),
               preparedSpells               
            }
         }, () => {
            this.props.startEditProfile(this.props.id, {spellbook: this.state.spellbook})
         })
      })
   }
  
   render () { 
      return (
         <Fragment>
            <SpellModal 
               selected={this.state.selected}
               handleCloseModal={this.handleCloseModal}
            />            

            <h3 className="row row--center">Prepared Spells</h3>

            <div className="grid grid--preparedSpells">
               <h5 className="grid__col1">Spell</h5>
               <h5>Rmng</h5>
               <div></div>
               <div></div>

               {this.state.preparedSpells.map((spell, i) => (
                  <Fragment key={i}>						
                     <button 
                        className="grid__col1 button--link"                         
                        key={`spell${spell.level}${i}`}
                        id={spell.id}
                        onClick={this.handleOpenModal}
                     >
                        {spell.name}
                     </button>
            
                     <div key={`rmng${spell.level}${i}`}>{spell.remaining}</div>

                     {this.state.castSpells.includes(spell.id) ?
                        <button 
                           key={`undo${spell.level}${i}`}
                           spellid={spell.id}
                           level={spell.level}
                           attribute="used"
                           change={-1}
                           onClick={this.handleChange}
                        >
                           Undo
                        </button>
                        :
                        <div></div>
                     }
                     
                     {spell.remaining > 0 ?
                        <button 
                           key={`cast${spell.level}${i}`}
                           spellid={spell.id}
                           level={spell.level}
                           attribute="used"
                           change={1}
                           onClick={this.handleChange}
                        >
                           Cast
                        </button>
                        :
                        <div></div>
                     }

                     
                  </Fragment>
               ))}
            </div>
            
         </Fragment>
      )
   }
}


export default PreparedSpells