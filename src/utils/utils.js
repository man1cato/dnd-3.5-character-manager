import _ from 'lodash'
import { sizeMods } from './staticData'


export const convertTextToArray = string => _.compact(string.split(/\n/))

export const convertInputValue = value => {
	value = Number(value)
	if (value === '' || isNaN(value)) { return 0 }
	if (value === 0) { return '' }
	return value
}

export const apiObjectToArray = obj => _.sortBy(
	_.map(obj, (val, key) => ({ id: key, ...val })), 
	['name']
)


export const rollDice = (countDice = 1, dieFaces = 6) => {
	let total = 0
	for (let i = 0; i < countDice; i++) {
		total += Math.floor((Math.random() * dieFaces) + 1)
	}
	return total
}

export const calcStartingGold = jobClassName => {
	if (_.includes(['Sorcerer', 'Wizard'], jobClassName)) {
		return rollDice(3, 4) * 10
	}
	if (_.includes(['Barbarian', 'Bard'], jobClassName)) {
		return rollDice(4, 4) * 10
	}
	if (_.includes(['Fighter', 'Paladin', 'Ranger'], jobClassName)) {
		return rollDice(6, 4) * 10
	}
	if (_.includes(['Cleric',  'Rogue'], jobClassName)) {
		return rollDice(5, 4) * 10
	}
	if (jobClassName === 'Druid') {
		return rollDice(2, 4) * 10
	}
	if (jobClassName === 'Monk') {
		return rollDice(5, 4)
	}
}

export const calcAbilityMod = abilityScore => Math.floor(abilityScore/2 - 5)


export const calcSkillPoints = (jobClassName, intMod) => {
	if (_.includes(['Cleric', 'Fighter', 'Paladin', 'Sorcerer', 'Wizard'], jobClassName)) {
		return 2 + intMod
	}
	if (_.includes(['Barbarian', 'Druid', 'Monk'], jobClassName)) {
		return 4 + intMod
	}
	if (_.includes(['Bard', 'Ranger'], jobClassName)) {
		return 6 + intMod
	}
	if (jobClassName === 'Rogue') {
		return 8 + intMod
	}
}


export const calcBaseMeleeBonus = (baseAttackBonus, strScore, size) => baseAttackBonus + calcAbilityMod(strScore) + sizeMods[size].size
export const calcBaseRangedBonus = (baseAttackBonus, dexScore, size) => baseAttackBonus + calcAbilityMod(dexScore) + sizeMods[size].size
export const calcBaseGrappleBonus = (baseAttackBonus, strScore, size) => baseAttackBonus + calcAbilityMod(strScore) + sizeMods[size].grapple 

export const calcAttackBonuses = (baseAttackBonuses, characterSize, strScore, dexScore) => ({
	melee: _.map(baseAttackBonuses, bab => bab + calcAbilityMod(strScore) + sizeMods[characterSize].size),
	ranged: _.map(baseAttackBonuses, bab => bab + calcAbilityMod(dexScore) + sizeMods[characterSize].size),
	grapple: _.map(baseAttackBonuses, bab => bab + calcAbilityMod(strScore) + sizeMods[characterSize].grapple) 
})

export const calcTotalMoney = ({ pp, gp, sp, cp }) => Number((pp * 10 + gp + sp / 10 + cp / 100).toFixed(2))

export const convertMoneyToDenominations = moneyInGp => {
	const pp = Math.trunc(moneyInGp / 10) 
	const gp = Math.trunc(moneyInGp - pp * 10) 
	const sp = Math.trunc(moneyInGp * 10 - pp * 100 - gp * 10)
	const cp = Math.trunc(moneyInGp * 100 - pp * 1000 - gp * 100 - sp * 10)

	return {	pp, gp, sp, cp	}
}

export const calcItemTotalValue = (item, qty) => {
	const totalValue = item.value * qty
	return isNaN(totalValue) ? 0 : Number(totalValue.toFixed(1))
}

export const calcItemTotalWeight = (item, qty) => {
	const totalWeight = item.weight * qty
	return isNaN(totalWeight) ? 0 : Number(totalWeight.toFixed(1))
}

export const calcEquipmentTotalValue = (equipment, items) => {
	const res = _.reduce(
		_.map(equipment, item => items[item.id].value * item.qty), 
		(total, num) => total + num, 
		0
	)
	return res.toFixed(2)
}
export const calcEquipmentTotalWeight = (equipment, items) => {
	const res = _.reduce(
		_.map(equipment, item => items[item.id].weight * item.qty), 
		(total, num) => total + num, 
		0
	)
	return res.toFixed(2)
}
