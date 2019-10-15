import React, { useState, useEffect } from 'react'

import { convertInputValue } from '../../utils/utils'
import './PhysicalStats.scss'


const PhysicalStats = props => {
	const { hp, ac, initBase, speed, handleUpdate } = props
	const [hpMod, setHpMod] = useState(hp.mod || 0)
	const [hpDamage, setHpDamage] = useState(hp.damage || 0)
	const [hpTotal, setHpTotal] = useState(hp.base + hpMod + hpDamage)

	const [initMod, setInitMod] = useState(props.initMod || 0)
	const [initTotal, setInitTotal] = useState(initBase + initMod)

	useEffect(() => {
		setHpTotal(hp.base + hpMod - hpDamage)
		handleUpdate({
			hp: {
				base: hp.base,
				mod: hpMod,
				damage: hpDamage
			}
		})
	}, [hpMod, hpDamage])

	useEffect(() => {
		setInitTotal(initBase + initMod)
		handleUpdate({
			initiativeMod: initMod
		})
	}, [initMod])

	return (
		<>
			<div className="PhysicalStats__row">
				<div>Hit Points</div>
				<div>
					<div className="PhysicalStats__row__item">
						<h5>Base</h5>
						<div>{hp.base}</div>
					</div>
					<div className="PhysicalStats__row__item--bottom">+</div>
					<div className="PhysicalStats__row__item">
						<h5>Mod</h5>
						<input
							type="number"
							data-testid="hpMod"
							value={convertInputValue(hpMod)}
							onChange={(e) => setHpMod(Number(e.target.value))}
						/>
					</div>
					<div className="PhysicalStats__row__item--bottom">-</div>
					<div className="PhysicalStats__row__item">
						<h5>Dmg</h5>
						<input
							type="number"
							data-testid="hpDamage"
							value={convertInputValue(hpDamage)}
							onChange={(e) => setHpDamage(Number(e.target.value))}
						/>
					</div>
					<div className="PhysicalStats__row__item--bottom">=</div>
					<div className="PhysicalStats__row__item">
						<h5>Curr</h5>
						<div data-testid="hpTotal">{hpTotal}</div>
					</div>
				</div>
			</div>

			<div className="PhysicalStats__row">
				<div>Armor Class</div>
				<div>            
					<div className="PhysicalStats__row__item">
						<h5>Base</h5>
						<div>{ac.base}</div>
					</div>
					<div className="PhysicalStats__row__item">
						<h5>Flat</h5>
						<div>{ac.flat}</div>
					</div>
					<div className="PhysicalStats__row__item">
						<h5>Touch</h5>
						<div>{ac.touch}</div>
					</div>
				</div>
			</div>

			<div className="PhysicalStats__row">
				<div>Initiative</div>
				<div>            
					<div className="PhysicalStats__row__item">
						<h5>Base</h5>
						<div>{initBase}</div>
					</div>
					<div className="PhysicalStats__row__item--bottom">+</div>
					<div className="PhysicalStats__row__item">
						<h5>Mod</h5>
						<input
							type="number"
							data-testid="initMod"
							value={convertInputValue(initMod)}
							onChange={(e) => setInitMod(Number(e.target.value))}
						/>
					</div>
					<div className="PhysicalStats__row__item--bottom">=</div>
					<div className="PhysicalStats__row__item">
						<h5>Total</h5>
						<div>{initTotal}</div>
					</div>                
				</div>
			</div>
	
			<div className="PhysicalStats__row">
				<div>Speed</div>
				{speed.ground ? 
					<div>   
						<div className="PhysicalStats__row__item">
							<h5>Ground</h5>
							<div>{speed.ground}</div>
						</div>
						<div className="PhysicalStats__row__item">
							<h5>Flight</h5>
							<div>{speed.flight}</div>
						</div>                 
					</div>
				:
					<div>{speed} ft/round</div>            
				}       
			</div>
		</>
	)
}


export default PhysicalStats