import React from 'react'
import { connect } from 'react-redux'
import { apiObjectToArray } from '../utils/utils'


export const Weapons = (props) => (
	<>
		{props.weaponSet.map((weaponId) => {
			const weapon = props.weapons.find((weapon) => weapon.id === weaponId)

			return (
				<div className="grid--weapons" key={weaponId}>
					<h4 className=" grid--weapons__name">{weapon.name}</h4>
					<div className="grid--weapons__features">{weapon.weaponType}, {weapon.encumbrance}, {weapon.damageType}</div>

					<h5 className="grid--weapons__track">Rng</h5>
					{/* <h5 className="grid--weapons__track">Atk</h5> */}
					<h5 className="grid--weapons__track">Dmg</h5>
					<h5>Crit</h5>

					<div className="grid--weapons__track">{weapon.range}</div>
					{/* <div className="grid--weapons__track">+{
						(weapon.encumbrance === "Ranged" && props.rangedBonus)
						|| (weapon.encumbrance === "Unarmed" && props.grappleBonus)
						|| props.meleeBonus
					}</div> */}
					<div className="grid--weapons__track">{weapon.damageM}</div>
					<div>{weapon.critical}</div>
				</div>
			)
		})}
	</>
)

const mapStateToProps = (state) => ({
   weapons: apiObjectToArray(state.items).filter((item) => item.category === "Weapon")
})

export default connect(mapStateToProps)(Weapons)