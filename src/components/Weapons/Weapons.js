import React from 'react'
import { connect } from 'react-redux'

import { apiObjectToArray } from '../../utils/utils'
import './Weapons.scss'


export const Weapons = ({ weapons, equippedWeapons, attackBonuses }) => (
	<>
		{equippedWeapons.map(weaponId => {
			const weapon = weapons.find((weapon) => weapon.id === weaponId)
			return (
				<div className="weapon" key={weaponId}>
					<h4>{weapon.name}</h4>
					<div className="weapon__features">{weapon.weaponType}, {weapon.encumbrance}, {weapon.damageType}</div>

					<div className="weapon__stats">
						<div>
							<h5>Rng</h5>
							<div>{weapon.range}</div>
						</div>
						{/* <div>
							<h5>Atk</h5>
							<div>+{
								(weapon.encumbrance === "Ranged" && attackBonuses.rangedBonus)
								|| (weapon.encumbrance === "Unarmed" && attackBonuses.grappleBonus)
								|| attackBonuses.meleeBonus
							}</div>
						</div> */}
						<div>
							<h5>Dmg</h5>
							<div>{weapon.damageM}</div>
						</div>
						<div>
							<h5>Crit</h5>
							<div>{weapon.critical}</div>
						</div>
					</div>
				</div>
			)
		})}
	</>
)


const mapStateToProps = state => ({
   weapons: apiObjectToArray(state.items).filter((item) => item.category === "Weapon")
})

export default connect(mapStateToProps)(Weapons)