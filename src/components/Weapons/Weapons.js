import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { apiObjectToArray } from '../../utils/utils'
import './Weapons.scss'


export const Weapons = ({ weapons, equippedWeapons, characterSize, attackBonuses }) => (
	<>
		{equippedWeapons.map(weaponId => {
			const weapon = weapons.find(weapon => weapon.id === weaponId)
			return (
				<div className="weapon" key={weaponId}>
					<h4>{weapon.name}</h4>
					<div className="weapon__features">{weapon.weaponType}, {weapon.encumbrance}, {weapon.damageType}</div>

					<div className="weapon__stats">
						<div>
							<h5>Rng</h5>
							<div>{weapon.range}</div>
						</div>
						<div>
							<h5>Atk</h5>
							<div>+{
								(weapon.encumbrance === "Ranged" && attackBonuses.ranged.total.join(' / '))
								|| (weapon.encumbrance === "Unarmed" && attackBonuses.grapple.total.join(' / '))
								|| attackBonuses.melee.total.join(' / ')
							}</div>
						</div>
						<div>
							<h5>Dmg</h5>
							<div>{weapon.damage[_.lowerCase(characterSize)]}</div>
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


const mapStateToProps = ({ items, races, profile }) => ({
	characterSize: races[profile.race].size,
   weapons: apiObjectToArray(items).filter(item => item.category === "Weapon")
})

export default connect(mapStateToProps)(Weapons)