import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import update from 'react-addons-update';

import SpellModal from './SpellModal';
import { startEditProfile } from '../actions/profile';


export class Spells extends React.Component{
   //spellbook values are not being loaded before component mounts
   state = {
      spellbook: this.props.spellbook,
      selected: undefined
   }  

   componentDidUpdate(prevProps, prevState) {
      if (this.state.spellbook !== prevState.spellbook) {
         this.props.startEditProfile(this.props.id, {spellbook: this.state.spellbook});
      }
	}

   handleOpenModal = (e) => {
      const spellId = e.target.id;
      const selected = this.props.spells.find((spell) => spell.id === spellId);
      this.setState({selected});
   }

   handleCloseModal = () => {
      this.setState({selected: undefined});
   }

   handleChange = (e) => {
      const level = e.target.getAttribute("level");
      const index = e.target.getAttribute("index");
      const attribute = e.target.getAttribute("attribute");
      const valueChange = Number(e.target.getAttribute("change"));

      this.setState((prevState) => {
         const spell = prevState.spellbook[level].spells[index];
         const value = prevState.spellbook[level].spells[index][attribute] + valueChange;
         const remaining = attribute === "prepared" ? value - spell.used : spell.prepared - value;

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
            })
         }
      }, () => {
         this.setState((prevState) => {
            const total = prevState.spellbook[level].spells.map((spell) => spell.prepared).reduce((total, num) => total + num);
            return {
               spellbook: update(prevState.spellbook, {
                  [level]: {
                     total: { $set: total }
                  }
               })
            }
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

            <div className="grid grid--spells">
               <h5 className="grid__col1">Spell</h5>
               <h5>Rmng</h5>
               <div></div>

               {this.state.spellbook.map((page, level) => 
                  page.spells.map((spell, i) => (
                     <Fragment>						
                        <button 
                           className="grid__col1 button--link" 
                           id={spell.id}
                           key={`spell${level}${i}`}
                           hidden={spell.prepared < 1} 
                           onClick={this.handleOpenModal}
                        >
                           {spell.name}
                        </button>
               
                        <div key={`rmng${level}${i}`} hidden={spell.prepared < 1}>{spell.remaining}</div>

                        <button 
                           key={`cast${level}${i}`}
                           change={1}
                           index={i}
                           attribute="used"
                           level={level}
                           hidden={spell.prepared < 1} 
                           onClick={this.handleChange}
                        >
                           Cast
                        </button>
                     </Fragment>
                  ))
               )}
            </div>
            
         </Fragment>
      )
   }
}


const mapStateToProps = (state) => ({
   id: state.profile.id,
   spellbook: state.profile.spellbook,
   spells: state.spells
});

const mapDispatchToProps = (dispatch, props) => ({
	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(Spells);